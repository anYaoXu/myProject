import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes)
  ]
})
export class HomeModule { }
