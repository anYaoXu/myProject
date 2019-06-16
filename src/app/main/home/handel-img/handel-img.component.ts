import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-handel-img',
  templateUrl: './handel-img.component.html',
  styleUrls: ['./handel-img.component.less']
})
export class HandelImgComponent implements OnInit {

  @ViewChild('img') myImg: ElementRef;
  @ViewChild('div') myDiv: ElementRef;
  clickCount = 1;
  bj = 50;
  constructor() { }

  ngOnInit() {
    this.aa();
  }
  zoomOut() {
    console.log(this.myImg);
    const currwidth = this.myImg.nativeElement.clientWidth;
    if (currwidth >= 800) {

    } else {
      this.myImg.nativeElement.style.width = (currwidth + 50) + 'px';
    }
    // this.bj += 50;
  }
  zoomIn() {
    console.log(this.myImg);
    const currwidth = this.myImg.nativeElement.clientWidth;
    if (currwidth <= 500) {

    } else {
      this.myImg.nativeElement.style.width = (currwidth - 50) + 'px';
    }
  }
  leftRotate() {
    const img = this.myImg.nativeElement;
    const div = this.myDiv.nativeElement;
    let tran = 0;
    const hasRote = img.style.transform.indexOf('rotate(');
    if (hasRote >= 0) {
      const transform = img.style.transform;
      tran = parseInt(transform.substr(transform.indexOf('(') + 1), 10);
    }
    img.style.transform = 'rotate(' + (tran + 90) + 'deg)';
    this.clickCount++;
    // this.bj = 200;
    // const w = img.clientHeight;
    // const h = img.clientWidth;
    // img.style.width = w + 'px';
    // img.style.height = h + 'px';
    // const left = (div.clientWidth - img.clientHeight) / 4;
    // const top = (div.clientHeight - img.clientWidth) / 4;
    // img.style.left = 0 + 'px';
    // img.style.top = 0 + 'px';
  }
  rightRotate() {
    this.myImg.nativeElement.style.transform = 'rotate(-90deg)';

  }
  aa() {
    const _t = this;
    const drag = this.myImg.nativeElement;
    const div = this.myDiv.nativeElement;
    drag.onmousedown = function (event) {
      const e = event || window.event;
      const diffx = e.clientX - drag.offsetLeft;
      const diffy = e.clientY - drag.offsetTop;
      if (typeof drag.setCapture !== 'undefined') {
        drag.setCapture();
      }
      drag.onmousemove = function (event1) {
        const e1 = event1 || window.event;
        let movex = e1.clientX - diffx;
        let movey = e1.clientY - diffy;
        // 如果是竖向
        if (_t.clickCount % 2 === 0) {
          // const sjl = (drag.clientWidth - drag.clientHeight) / 2 + drag.offsetLeft;
          // const sjt = (drag.clientHeight - drag.clientWidth) / 2 - drag.offsetTop;
          // movex = sjl >= div.clientWidth - _t.bj ? div.clientWidth - _t.bj - 62 : movex;
          // movey = sjt >= div.clientHeight - _t.bj ? div.clientHeight - _t.bj - 62 : movey;
          // if (movex < 0) {
          //   movex = drag.clientWidth + movex <= _t.bj ? -drag.clientWidth + _t.bj : movex;
          // }
          // if (movey < 0) {
          //   movey = drag.clientHeight + movey <= _t.bj ? -drag.clientHeight + _t.bj : movey;
          // }
        } else {
          movex = movex >= div.clientWidth - _t.bj ? div.clientWidth - _t.bj : movex;
          movey = movey >= div.clientHeight - _t.bj ? div.clientHeight - _t.bj : movey;
          if (movex < 0) {
            movex = drag.clientWidth + movex <= _t.bj ? -drag.clientWidth + _t.bj : movex;
          }
          if (movey < 0) {
            movey = drag.clientHeight + movey <= _t.bj ? -drag.clientHeight + _t.bj : movey;
          }
        }
        drag.style.left = movex + 'px';
        drag.style.top = movey + 'px';
      };
      drag.onmouseup = function (event2) {
        this.onmousemove = null;
        this.onmouseup = null;
      };
    };
    div.onmouseout = function () {
      drag.onmousemove = null;
      drag.onmouseup = null;
    };
  }

}