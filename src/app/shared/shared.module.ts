
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';
import { AppPopImportDirective } from './directives/pop-import.directive';
import { ImportFileComponent } from './compontent/import-file/import-file.component';
import { ButtonClickDirective } from './directives/button-click.directive';
import { PopExportDirective } from './directives/pop-export.directive';
import { ExportFileComponent } from './compontent/export-file/export-file.component';

@NgModule({
    declarations: [
        ScrollbarDirective,
        TablesComponent,
        AppPopImportDirective,
        ImportFileComponent,
        ButtonClickDirective,
        PopExportDirective,
        ExportFileComponent
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
        ReactiveFormsModule,
        ExportFileComponent
    ]
})

export class SharedModule { }
