import { CoreService } from '../../core/core.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Directive, Input, HostListener } from '@angular/core';
import { ImportFileComponent } from '../compontent/import-file/import-file.component';
import { UtilService } from 'src/app/core/util.service';
import { environment } from 'src/environments/environment';
import { urls } from 'src/app/core/urls.model';
import { filter } from 'rxjs/internal/operators';

@Directive({
  selector: '[appAppPopImport]'
})
export class AppPopImportDirective {
  @Input() config: any = {};
  private num = 0;
  @HostListener('click') onClick() {
    const modal = this.modalService.create({
      nzTitle: '批量导入',
      nzWidth: 700,
      nzContent: ImportFileComponent,
      nzComponentParams: this.config,
      nzFooter: UtilService.getModalFooter((_modal) => {
        const comfirModal = this.modalService.confirm({
          nzTitle: '确认导入',
          nzContent: '导入成功后对导入的数据发布生效',
          nzOnOk: () => {
            // 点击确定开始导入
            // 发送多个请求上传多个文件
            const list = [..._modal.list.filter(item => item.file)];
            for (let i = 0; i < list.length; i++) {
              const formData = new FormData();
              formData.append('method', 'post');
              formData.append('token', UtilService.getLoginInfo().token);
              const item = list[i];
              if (item.file) {
                formData.append('file', item.file);
                formData.append('type', item.type);
                formData.append('id', this.config.id);
                if (this.config.params) {
                  for (let p in this.config.params) {
                    if (p !== 'list') {
                      formData.append(p, this.config.params[p]);
                    }
                  }
                }
                this.http.request(new HttpRequest('POST',
                  environment.apiPath + urls.importfile, formData)).pipe(
                    filter(e => e instanceof HttpResponse)).subscribe((res: any) => {
                      if (res.body.code === 200) {
                        this.num++;
                        if (this.num === list.length) {
                          if (this.config.needEmit) {
                            this.core.globalImportEvent.emit(
                              { id: this.config.id, type: 'success' });
                          }
                        }
                        if (list.length === 1) {
                          this.message.success(`导入成功<span class='text-primary'>${res.body.data.successnum}</span>行`);
                          this.core.globalImportEvent.emit(
                            { id: this.config.id, type: 'success' });
                          modal.destroy();
                        }
                      } else if (res.body.code === 100) {
                        // 导入模板格式不正确
                        this.modalService.error({
                          nzTitle: '导入失败',
                          nzContent: '导入模板格式不正确'
                        });
                      } else if (res.body.code === 101 || res.body.code === 102) {
                        if (res.body.data.errorlist && res.body.data.errrlist.length > 0) {
                          const content = `导入失败提示语`;
                          const mod = this.modalService.create({
                            nzTitle: null,
                            nzContent: content,
                            nzClosable: false,
                            nzWrapClassName: 'tip-modal',
                            nzFooter: [
                              ...(res.body.code === 102 ? [
                                {
                                  label: '下载错误日志',
                                  onClick: () => {
                                    window.location.href = res.body.data.errorurl;
                                    mod.destroy();
                                  }
                                }
                              ] : []),
                              {
                                label: '确定',
                                type: 'primary',
                                onClick: () => {
                                  mod.destroy();
                                }
                              }
                            ]
                          });
                        }
                      } else {
                        this.modalService.error({
                          nzTitle: '导入失败',
                          nzContent: res.body.data.msg
                        });
                      }
                    });
              }
            }
            comfirModal.destroy();
          }
        });
      }, () => {
        modal.destroy();
      }, true, 'form', (_modal) => !_modal.list.some(l => l.file))
    });
  }
  constructor(private modalService: NzModalService,
    private http: HttpClient,
    private core: CoreService,
    private message: NzMessageService) { }

}
