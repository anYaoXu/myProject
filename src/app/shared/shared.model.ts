// 全局的localstroagekey
const projectPreFix = 'XX';
export const userInfoKey = projectPreFix + '_userInfoKey_';

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
