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
}
