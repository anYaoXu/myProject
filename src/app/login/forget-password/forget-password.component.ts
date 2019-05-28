import { LoginService } from './../login.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from 'src/app/core/util.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  @Input() data;
  constructor(private fb: FormBuilder) { }
  form;
  disabledInput = false;
  countryCodeList = [
    { code: 1, name: '+86 中国大陆' },
    { code: 2, name: '+00 国外' }
  ];
  ngOnInit() {
    const validataList = [
      UtilService.required,
      UtilService.maxLength(16),
      UtilService.minLength(6),
      LoginService.validPassword,
    ];
    this.form = this.fb.group({
      countrycode: [1],
      mobile: [null, [UtilService.required]],
      vcode: [null, [UtilService.required]],
      newpwd: [null, [...validataList, this.confirmationValidator('repwd')]],
      repwd: [{ value: null, disabled: this.disabledInput }, [...validataList, this.confirmationValidator('newpwd')]]
    });
  }
  $control(name) {
    return this.form.controls[name];
  }
  $(name) {
    return this.form.controls[name].value;
  }
  confirmationValidator(name) {
    return (control: FormControl) => {
      if (control && control.value && control.value.length > 6 && control.value.length <= 16) {
        if (control && control.valid) {
          return null;
        } else if (control.value !== this.$(name)) {
          return { confirm: true, error: true };
        }
      } else {
        return null;
      }
    };
  }
  updateConfirmValidator() {
    if (this.$control('newpwd')) {
      this.$control('newpwd').updateValueAndValidity();
      this.$control('repwd').updateValueAndValidity();
    }
  }

}
