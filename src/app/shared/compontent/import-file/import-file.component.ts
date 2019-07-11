import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UtilService } from 'src/app/core/util.service';
import { environment } from 'src/environments/environment';
import { projectName, version } from 'src/app/core/urls.model';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.less']
})
export class ImportFileComponent implements OnInit {
  @Input() list: any[];
  @Input() params: any[]; // 导入参数和下载模板参数是一样的
  defSuffixList = ['xls', 'xlsx'];
  constructor(private message: NzMessageService) { }

  ngOnInit() {
    this.list.forEach(item => delete item.file);
  }

  changeFile(i, fileInput) {
    // 判断该文件是否合法
    const file = fileInput.files[0];
    const validFieldType = (this.list[i].suffixList || this.defSuffixList).some(item => file.name.endsWith('.' + item));
    const validSize = file.size <= (this.list[i].size || 1024000);
    if (file && validFieldType && validSize) {
      this.list[i].file = file;
    } else {
      if (!validFieldType) {
        this.message.error('文件类型错误');
      } else if (!validSize) {
        this.message.error('文件过大');
      }
      this.list[i].file = null;
      return false;
    }
  }

  downTemplate(i) {
    let paramsObj = {};
    if (this.params) {
      paramsObj = UtilService.deepTrim(this.params);
    }
    let params = '';
    if (this.params) {
      for (let p in this.params) {
        params += `&${p}=${this.params[p]}`;
      }
    }
    window.location.href = `${environment.apiPath}${projectName + version}/exportfile/?
    exporttype=${this.list[i].type}&token=${UtilService.getLoginInfo().token}
    &data=${encodeURI(JSON.stringify(paramsObj))}&templatetype=1` + params;
  }

}
