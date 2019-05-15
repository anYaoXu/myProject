import { FormControl } from '@angular/forms';
import { Injectable, Inject } from '@angular/core';

/* 工具接口 */
@Injectable()

export class UtilService {
    constructor() { }
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
            if (value && value.trim) {
                if (value.trim().length > maxLength) {
                    return { maxlength: true, error: true }
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
            if (value && value.trim) {
                if (value.trim().length < minLength) {
                    return { maxlength: true, error: true }
                }
            }
        }
    }
}
