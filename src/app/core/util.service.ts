import { FormControl } from '@angular/forms';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from './urls.model';
import { environment } from 'src/environments/environment';
import { apiPathKey, userInfoKey } from '../shared/shared.model';
declare let $: any;

/* 工具接口 */
@Injectable()

export class UtilService {
    private static urls = urls;
    globalService = new EventEmitter();
    constructor(
        private http: HttpClient
    ) { }
    /* *
    * 获取默认的模态框底部按钮组
    * @param onClick  ok按钮确认事件，必须传入
    * @param onCancel  cancel按钮确认事件，必须传入
    * @param {boolean}  needDisabled 是否需要禁用逻辑
    * @param {string} formkey 禁用逻辑调用的form表单的key值
    * @param {(_modal) => any} disabled 默认的禁用逻辑，验证表单是否合法，是否干净
    * @param {(modal) => any} onCancel 默认的取消事件
    * @returns {({label: string} | {label:string; disabled:(_modal)=> any; onClick:any} | {lable:string; onClick: any})[]}
    *  */
    static getModalFooter(onClick, onCancel, needDisabled = false, formkey = 'form',
        disabled = (_modal) => needDisabled && _modal[formkey] && (_modal[formkey].invalid || _modal[formkey].pristine)) {
        return [
            {
                label: '取消',
                onClick: onCancel
            },
            needDisabled ? {
                label: '确定',
                type: 'primary',
                disabled,
                onClick,
            } : {
                    label: '确定',
                    type: 'primary',
                    onClick
                }
        ];
    }
    /* *
     * 去前后空格后判断是否为空
     * @param {FormControl} control
     * @returns {any}
     */
    static required(control: FormControl) {
        if (typeof control.value === 'string') {
            return control.value.trim().length === 0 ? { required: true, error: true } : null;
        } else if (control.value instanceof Array) {
            return control.value.length === 0 ? { required: true, error: true } : null;
        } else if (control.value !== 0) {
            return control.value ? null : { required: true, error: true };
        } else {
            return null;
        }
    }
    /* *
    * 去前后空格判断上限长度
    */
    static maxLength(maxLength: number) {
        return function (control: FormControl) {
            const value = control.value;
            if (value && value.trim()) {
                if (value.trim().length > maxLength) {
                    return { maxlength: true, error: true };
                }
            }
        };
    }
    /*
     * 去前后空格判断下限长度
    */
    static minLength(minLength: number) {
        return function (control: FormControl) {
            const value = control.value;
            if (value && value.trim()) {
                if (value.trim().length < minLength) {
                    return { minlength: true, error: true };
                }
            }
        };
    }
    /*
    * 获取请求的url
    * @param urlKey
    * @param paramsId
    * @returns {string}
    */
    static getUrl(urlKey, paramsId?) {
        const _url = UtilService.urls[urlKey];
        if (_url && _url.url && _url.url.startsWith(environment.tempPath)) {
            // _url 为 object  并且url 直接是以 http 开头
            return _url.urls;
        } else if (_url && typeof _url === 'string' && _url.startsWith(environment.tempPath)) {
            // _url 为字符串 并且 _url 直接是以http 开头
            return _url;
        } else {
            // _url 不是以 http 开头
            const getSafeStr = (str: string) => {
                if (str.slice(-1) === '/') {
                    return str.slice(0, str.length - 1);
                } else {
                    return;
                }
            };
            let path = getSafeStr(environment.apiPath);  // 去掉最后一个/
            // 如果localStorage 中 设置了请求的服务 从 localStorage 中取path
            const localStorage_apiPath = localStorage.getItem(apiPathKey);
            if (environment.apiPathChangeable && localStorage && localStorage_apiPath) {
                environment.apiPath = path = getSafeStr(localStorage_apiPath);
            }
            let realKey = urlKey;
            let id = '';
            if (urlKey.includes('/')) {
                realKey = realKey.slice(0, urlKey.indexof('/'));  // 得到 / 前面的值
                id = urlKey.slice(urlKey.indexof('/') + 1);  // 得到 / 后面的 为参数
            }
            const realUrl = typeof UtilService.urls[realKey] === 'string' ?
                UtilService.urls[realKey] : UtilService.urls[realKey].url;
            // 拼接url 如果有参数将参数拼接进去
            const url = realUrl + (id ? `/${id}` : (paramsId === undefined ? '' : `/${paramsId}`));
            return UtilService.urls[realKey].isStatic ? (environment.deployPath + '/assets/mock' + url + '.json') : (path + url + '/');
        }
    }
    /*
     * 组装公共参数
     */
    static getCommonParams(params, method = 'get') {
        const data = null;
        delete params.id;
        return {
            // data: JSON.stringify(UtilService.deepTrim(params)),
            data: JSON.stringify(params),
            req_type: '10',
            token: '',
            bodyparams: '',
            method,
            action: params.action || ''
        };
    }


    static getLoginInfo() {
        return {
            username: $.cookie('username'),
            userid: $.cookie('userid'),
            loginname: $.cookie('loginname'),
            mobile: $.cookie('mobile'),
            token: $.cookie('token'),
            headimg: $.cookie('headimg')
        };
    }
    static delLoginInfo() {
        $.cookie('username', '');
        $.cookie('userid', '');
        $.cookie('loginname', '');
        $.cookie('mobile', '');
        $.cookie('token', '');
        $.cookie('headimg', '');
    }
    static saveUserInfo(user) {
        if (user) {
            UtilService.setLoginInfoCookie(user);
            localStorage.setItem(userInfoKey, JSON.stringify(user));
        } else {
            localStorage.removeItem(userInfoKey);
        }
    }
    static setLoginInfoCookie(user, cookieConfig?) {
        if (cookieConfig) {
            $.cookie('username', user.username, cookieConfig);
            $.cookie('userid', user.userid, cookieConfig);
            $.cookie('loginname', user.loginname, cookieConfig);
            $.cookie('mobile', user.mobile, cookieConfig);
            $.cookie('token', user.token, cookieConfig);
            $.cookie('headimg', user.headimg, cookieConfig);
        } else {
            $.cookie('username', user.username);
            $.cookie('userid', user.userid);
            $.cookie('loginname', user.loginname);
            $.cookie('mobile', user.mobile);
            $.cookie('token', user.token);
            $.cookie('headimg', user.headimg);
        }
    }
    /*
     *通用的post 请求
     */
    post(url, params: any = {}) {
        return this.http.post(UtilService.getUrl(url, params.id), UtilService.getCommonParams(params, 'post'));
    }
    getToday(callback) {
        // 返回当前时间戳 毫秒
        callback(new Date().getTime());
    }
    saveLoginInfo(data, callback?) {
        UtilService.delLoginInfo();
        UtilService.saveUserInfo(data.user);
        this.getToday(time => {
            const cookieconfig = { expirse: new Date(time + 12 * 60 * 60 * 1000) };
            UtilService.setLoginInfoCookie(data.user, cookieconfig);
            if (callback) {
                callback();
            }
        });
    }
}
