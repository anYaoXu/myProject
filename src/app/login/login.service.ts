import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { REGEXP } from '../shared/shared.model';


@Injectable()
export class LoginService {
    constructor() { }
    static validPassword(control: FormControl) {
        const value = control.value ? control.value.trim() : '';
        if (value) {
            if (value.length >= 8 && value.length <= 16) {
                // 包含数字 大写字母 小写字母 特殊字符 4选3
                if (!REGEXP.spec.test(value)) {
                    if (!(REGEXP.lowercase.test(value) && REGEXP.upcase.test(value) && REGEXP.num.test(value))) {
                        return { error: true, mistake: true };
                    }
                } else if (!REGEXP.lowercase.test(value)) {
                    if (!(REGEXP.spec.test(value) && REGEXP.upcase.test(value) && REGEXP.num.test(value))) {
                        return { error: true, mistake: true };
                    }
                } else if (!REGEXP.upcase.test(value)) {
                    if (!(REGEXP.spec.test(value) && REGEXP.lowercase.test(value) && REGEXP.num.test(value))) {
                        return { error: true, mistake: true };
                    }
                } else if (!REGEXP.num.test(value)) {
                    if (!(REGEXP.spec.test(value) && REGEXP.lowercase.test(value) && REGEXP.upcase.test(value))) {
                        return { error: true, mistake: true };
                    }
                }
            }
        }
    }
}
