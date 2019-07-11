import { filter, map } from 'rxjs/internal/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from './../../environments/environment';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { langInfoKey } from '../shared/shared.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class CoreService {
  // 路由改变事件
  routeChangeEvent = new EventEmitter();
  // 全局列表
  globalTableEvent = new EventEmitter();
  // 导入事件
  globalImportEvent = new EventEmitter();
  constructor(
    private translateService: TranslateService,
    private nzI18nService: NzI18nService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
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

  // 对路由进行监听
  watchRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe((route) => {
      this.titleService.setTitle(route.snapshot.data['title']);
      this.routeChangeEvent.emit();
    });
  }
}
