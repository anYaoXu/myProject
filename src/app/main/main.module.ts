import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';


const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: []
  }
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
