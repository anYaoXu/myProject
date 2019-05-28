import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UtilService } from '../core/util.service';
import { HttpRes } from '../shared/shared.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginType = 'acount';
  loginForm: FormGroup;
  showPassord = false;
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private utilService: UtilService) { }
  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        userName: ['', []], // Validators.required
        password: ['', []],
        countrycode: ['+86 中国大陆']  // Validators.required
      });
  }
  login(): void {
    if (this.loginType === 'acount') {
      if (!(this.$('userName') && this.$('password'))) {
        this.message.error('账号/密码不能为空');
        return;
      }
    }
    this.utilService.post('login', {
      loginname: this.$('userName'),
      password: this.$('password'),
      logintype: this.loginType === 'acount' ? 1 : 2,
      countrycode: this.$('countrycode')
    }).subscribe((res: HttpRes) => {
      this.utilService.globalService.emit('发送登录成功');
      if (res.code === 200) {
        console.log('登录成功');
      } else {
        this.message.error(res.msg);
      }
    });
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
  clearValue(name, template, template2?) {
    if (name) {
      this.$control(name).setValue('');
    }
    if (template) {
      template.focus();
    }
    if (template2) {
      template2.focus();
    }
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
        this.utilService.post('/login', {}).subscribe((result: HttpRes) => {
          if (result.code === 200) {
            this.message.success('保存成功');
          } else {
            this.message.error(result.msg);
          }
        });
      }, () => { modal.destroy(); }, true)
    });
  }
}
