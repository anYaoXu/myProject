import { MainService } from './../main/main.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG, zh_CN } from 'ng-zorro-antd';

import { NgModule } from '@angular/core';
import { UtilService } from './util.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivateGuardService } from '../shared/guard/activate-guard.service';
import { CanDeactivateGuardService } from '../shared/guard/can-deactivate-guard.service';

const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, environment.deployPath + '/assets/i18n/', '.json');

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        UtilService,
        MainService,
        ActivateGuardService,
        CanDeactivateGuardService
    ]
})
export class CoreModule { }
