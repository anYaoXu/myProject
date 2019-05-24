import { Directive, AfterViewInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
declare let $: any;

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective implements AfterViewInit {

  defaultOptions = {
    axis: 'y',
    theme: 'minimal-dark',
    autoDraggerLength: true,
    scrollInertia: 100
  };
  @Output() funEvent = new EventEmitter();
  funOptions = {
    callbacks: {
      onTotalScroll: () => {
        this.funEvent.emit('totalScroll');
      }
    }
  };
  @Input() createScrollbar = true; // 是否创建滚动条
  @Input() options: any = {};  // 滚动条配置
  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit() {
    if (this.createScrollbar) {
      $(this.elementRef.nativeElement).mCustomScrollbar(Object.assign({}, this.defaultOptions, this.options, this.funOptions));
    }
  }
}
