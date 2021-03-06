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
            data: JSON.stringify(UtilService.deepTrim(params)),
            // data: JSON.stringify(params),
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
     * 判断是否为空对象 即 {}
     */
    static isEmptyObject(object) {
        return JSON.stringify(object) === '{}';
    }
    static getUniqueListByField(list: any[], field: string) {
        const uniqueList = [];
        list.forEach(item => {
            if (!uniqueList.some(u => u[field] === item[field])) {
                uniqueList.push(item);
            }
        });
    }
    /***
     * 深度trim
     *  */
    static deepTrim(obj) {
        if (obj === null) {
            return false;
        }
        let newObj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else {
            for (const i in obj) {
                if (obj.hasOwnProperty(i)) {
                    let objValue = obj[i];
                    if (typeof objValue === 'string') {
                        objValue = objValue.trim();
                    }
                    if (objValue === undefined || objValue === null) {
                        objValue = '';
                    }
                    // 过滤为空的参数
                    if (objValue === '') {
                        continue;
                    }
                    newObj[i] = typeof objValue === 'object' ? UtilService.deepTrim(objValue) : objValue;
                }
            }
        }
        return newObj;
    }
    /*
     *通用的post 请求
     */
    post(url, params: any = {}) {
        return this.http.post(UtilService.getUrl(url, params.id), UtilService.getCommonParams(params, 'post'));
    }
    /*
     * 通用的get请求
     *  */
    get(url, params: any = {}, commonParams = {}) {
        const common = UtilService.isEmptyObject(commonParams) ? {} : {
            ...{
                pageNumber: 1,
                pagesize: 10,
                sortfield: '',
                sortorder: '',
            }, ...commonParams
        };
        return this.http.post(
            UtilService.getUrl(url, params.id), UtilService.getCommonParams({ ...params, ...common }))
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
    convertToDNum(amount) {
        if (isNaN(amount) || amount >= 1000000000000) {
            return false;
            // 数值最大不超过1万亿
        }
        const sPrefix = amount < 0 ? '负' : '';                             // 将负号‘-’显示成汉字‘(负)’
        let sAmount = Math.abs(amount).toFixed(2);                          // 格式化成两位小数格式（两位小数对应“'角”和“分”）
        let sUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';                           // 14个权位单位
        const sCapital = '零壹贰叁肆伍陆柒捌玖';                              // 10个大写数字
        sAmount = sAmount.replace('.', '');                                 // 去除小数点（使数字与权位对应）
        sUnit = sUnit.substr(sUnit.length - sAmount.length);                // 截取权位
        let sOutput = '';
        for (let i = 0, len = sAmount.length; i < len; i++) {               // 拼接数字与权位单位
            sOutput += sCapital.substr(parseInt(sAmount.substr(i, 1), 10), 1) + sUnit.substr(i, 1);
        }
        return sPrefix + sOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零')
            .replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元');

    }

    // 数组去重(只针对普通数组，对象数组不起作用)
    unique(arr) {
        const newArr = Array.from(new Set(arr));
        return newArr;
    }
    // 数组去重2 (只针对对象数组)
    unique2(arr, key) {
        return arr.reduce((arrc, currValue) => {
            arrc.some(item => item[key] === currValue[key]) ? '' : arrc.push(currValue);
            return arrc;
        }, []);
    }
    // 数组去重3 (只针对对象数组)
    unique3(arr, key) {
        const obj = {};
        return arr.reduce((arrc, currValue) => {
            obj[currValue[key]] ? '' : obj[currValue[key]] = true && arrc.push(currValue);
            return arrc;
        }, []);
    }
    /**
     * 对数组进行排序
     * arr 原始数组
     * rev 正序(true)或是倒叙(false)
     * prop 首选排序字段
     * prop2 当首选排序字段值一样时 次要排序字段
    */
    sort1(arr, rev, prop, prop2?) {
        const _t = this;
        return arr.sort(function (obj1, obj2) {
            if (rev) {
                rev = 1;
            } else {
                rev = (rev) ? 1 : -1;
            }
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return rev * -1;
            } else if (val1 > val2) {
                return rev * 1;
            } else {
                if (prop2) {
                    let val3 = obj1[prop2];
                    let val4 = obj2[prop2];
                    if (!isNaN(Number(val3)) && !isNaN(Number(val4))) {
                        val3 = Number(val3);
                        val4 = Number(val4);
                    }
                    if (val3 < val4) {
                        return -1;
                    } else if (val3 > val4) {
                        return 1;
                    }

                    // const a = [];
                    // a.push(obj1);
                    // a.push(obj2);
                    // _t.sortb(a, prop2);
                } else {
                    return 0;
                }

            }
        });
    }
}
