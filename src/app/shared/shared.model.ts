export interface HttpRes {
    code: number;
    msg: string;
    data: any | {
        results?: Array<any> | {
            list?: Array<any>,
            total?: number
        },
        pageNumber?: number,
        pageSize?: number,
        total?: number
    };
}
// 全局的localstroagekey
const projectPreFix = 'XX';
export const userInfoKey = projectPreFix + '_userInfoKey_';
export const apiPathKey = projectPreFix + '_apiPathKey_';
export const langInfoKey = projectPreFix + '_langInfoKey_';
export const navListKey = projectPreFix + '_navListKey_';

export const homeMenuListKey = projectPreFix + '_homeMenuListKey_';
export const customMenuListKey = projectPreFix + '_customMenuListKey_';

/*
全局正则表达式
*/
export const REGEXP = {
    number: /\d/,
    // 密码限制
    lowercase: /[a-z]+/,
    upcase: /[A-Z]+/,
    num: /[0-9]+/,
    spec: /[~!@#$%^&*()_+]+/,
};
