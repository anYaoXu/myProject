import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { MainHeaderComponent } from './main-header/main-header.component';
// import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';

const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        // loadChildren: './home/home.module#HomeModule'
        component: HomeComponent
      },
    ]
  }
];

@NgModule({
  declarations: [MainComponent, MainHeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
