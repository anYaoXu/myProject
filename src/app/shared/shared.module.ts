import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesComponent } from './tables/tables.component';

@NgModule({
    declarations: [
        ScrollbarDirective,
        TablesComponent
    ],
    imports: [
        NgZorroAntdModule,
        CommonModule
    ],
    exports: [
        ScrollbarDirective,
        TablesComponent
    ]
})

export class SharedModule { }
