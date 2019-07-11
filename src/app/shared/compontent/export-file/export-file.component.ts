import { UtilService } from 'src/app/core/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { projectName, version } from 'src/app/core/urls.model';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.less']
})
export class ExportFileComponent implements OnInit {
  @Input() exportConfig: any = {};
  exporttype;
  exportShow = false;
  constructor() { }

  ngOnInit() {
    if (this.exportConfig.list) {
      this.exporttype = this.exportConfig.list[0].type;
    }
  }
  showExportPop() {
    this.exportShow = true;
    this.ngOnInit();
  }
  sureExport() {
    this.exportShow = false;
    if (this.exportConfig.list.length === 1) {
      this.exporttype = this.exportConfig.list[0].type;
    }
    // 导出数据
    let params = {};
    if (this.exportConfig.params) {
      params = UtilService.deepTrim(this.exportConfig.params);
    }
    let paramsStr = '';
    if (this.exportConfig.params) {
      for (let p in this.exportConfig.params) {
        if (this.exportConfig.params[p]
          && this.exportConfig.params[p] !== undefined
          && this.exportConfig.params[p].toString().length > 0) {
          paramsStr += `&${p}=${this.exportConfig.params[p]}`;
        }
      }
    }
    window.location.href = `${environment.apiPath}${projectName + version}/exportfile/?
    exporttype=${this.exporttype}&token=${UtilService.getLoginInfo().token}
    &data=${encodeURI(JSON.stringify(params))}&templatetype=0` + paramsStr;
  }
}
