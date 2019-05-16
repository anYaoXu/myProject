import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginType = 'acount';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private utilService: UtilService) { }
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
  forget() {
    // 打开忘记密码弹窗
    const modal = this.modalService.create({
      nzTitle: '忘记密码',
      nzContent: ForgetPasswordComponent,
      nzComponentParams: { data: 'data' },
      nzWidth: 800,
      nzFooter: UtilService.getModalFooter((_modal) => {
        // 确定按钮执行的方法
      }, () => { modal.destroy(); }, true)
    });
  }
}
