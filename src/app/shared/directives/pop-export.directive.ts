import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPopExport]'
})
export class PopExportDirective {
  @Input() url = '';
  @HostListener('click') onclick() {
    window.location.href = this.url;
  }
  constructor() { }

}
