import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginType = 'acount';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        userName: ['', []], // Validators.required
        password: ['', []]  // Validators.required
      });
  }
  submitForm(): void {
    if (this.loginType === 'acount') {
      if (!(this.$('userName') && this.$('password'))) {
        this.message.error('账号密码不能为空');
      }
    }
  }
  switchLoginType(type) {
    this.loginType = type;
  }
  $control(name) {
    return this.loginForm.controls[name];
  }
  $(name) {
    return this.$control(name).value;
  }
}
