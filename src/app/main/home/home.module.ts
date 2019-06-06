import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MyBillComponent } from './my-bill/my-bill.component';
import { MyEnterpriseComponent } from './my-enterprise/my-enterprise.component';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home/page',
        component: HomePageComponent
      },
      {
        path: 'home/myBill',
        component: MyBillComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, HomePageComponent, MyBillComponent, MyEnterpriseComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes)
  ]
})
export class HomeModule { }
