import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }
  submitForm(): void {
    console.log(this.loginForm.controls);
  }
}
