import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ActivateGuardService } from '../shared/guard/activate-guard.service';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ActivateGuardService],
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'custom',
        loadChildren: './custom/custom.module#CustomModule'
      }
    ]
  }
];

@NgModule({
  declarations: [MainComponent, MainHeaderComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
