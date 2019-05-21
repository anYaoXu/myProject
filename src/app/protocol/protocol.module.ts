import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtocolComponent } from './protocol.component';
import { Routes, RouterModule } from '@angular/router';

export const protocolRoutes: Routes = [
  {
    path: '',
    component: ProtocolComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [ProtocolComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(protocolRoutes)
  ]
})
export class ProtocolModule { }
