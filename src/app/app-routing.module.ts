import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', // 当匹配目录为空
    pathMatch: 'full',  // 匹配模式：路径完全一样 默认为'prefix': 以指定的路径开头
    redirectTo: '/login'  // 重定向到login 路由
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'protocol',
    loadChildren: './protocol/protocol.module#ProtocolModule'
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'drop',
    loadChildren: './drag-drop/cdk-drag-drop.module#CdkDragDropModule'
  },
  {
    path: '**',  // 路径通配符 当所有请求的url 不在前面的定义中，路由会选择此路由 相当于 404  not found 的页面
    pathMatch: 'full',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
