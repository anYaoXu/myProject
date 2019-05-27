import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { langInfoKey } from '../shared/shared.model';

@Injectable()
export class CoreService {
  constructor(
    private translateService: TranslateService,
    private nzI18nService: NzI18nService
  ) { }

  static getDefaultLang() {
    const localLang = localStorage.getItem(langInfoKey);
    const lang = localLang || environment.lang;
    if (lang !== localLang) {
      CoreService.setDefaultLang(lang);
    }
    return lang;
  }
  static setDefaultLang(lang) {
    localStorage.setItem(langInfoKey, lang);
  }
  initTranslateConfig() {
    const lang = CoreService.getDefaultLang();
    this.translateService.addLangs(['zh', 'en']);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    let langFile;
    switch (lang) {
      case 'zh':
        langFile = zh_CN;
        break;
      case 'en':
        langFile = en_US;
        break;
    }
    this.nzI18nService.setLocale(langFile);
  }
  changeLang(lang) {
    let langFile;
    switch (lang) {
      case 'zh':
        langFile = zh_CN;
        break;
      case 'en':
        langFile = en_US;
        break;
    }
    this.nzI18nService.setLocale(langFile);
  }
}
