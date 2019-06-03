
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';

@NgModule({
    declarations: [
        ScrollbarDirective,
        TablesComponent
    ],
    imports: [
        NgZorroAntdModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NgZorroAntdModule,
        CommonModule,
        ScrollbarDirective,
        TablesComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule { }
