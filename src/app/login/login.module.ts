import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [ ]
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
