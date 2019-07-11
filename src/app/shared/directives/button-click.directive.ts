import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appButtonClick]'
})
export class ButtonClickDirective {
  @Input() disableTime = 2000;
  @HostListener('click') onclick() {
    this.elementRef.nativeElement.disabeld = true;
    setTimeout(() => {
      this.elementRef.nativeElement.disabled = false;
    }, this.disableTime);
  }
  constructor(private elementRef: ElementRef) { }

}
