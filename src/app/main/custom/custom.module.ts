import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom.component';
import { Routes, RouterModule } from '@angular/router';

const CustomRoutes: Routes = [
  {
    path: '',
    component: CustomComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [CustomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CustomRoutes)
  ]
})
export class CustomModule { }
