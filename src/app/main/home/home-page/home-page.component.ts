import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  // data = [
  //   {
  //     name: '1',
  //     age: 1
  //   },
  //   {
  //     name: '2',
  //     age: 2
  //   },
  // ]
  @ViewChild('img') myImg: ElementRef;
  @ViewChild('div') myDiv: ElementRef;
  selectedValue;
  costItemData = [
    {
      a: 1,
      costItemName: '费用宣传费',
      costTypeName: '业务宣传费',
      tag: '超预算',
      bxje: 200,
      ybje: 200,
      fyls: 1,
      fyft: 1,
      fj: 3,
    },
    {
      a: 1,
      costItemName: '宣传用品',
      costTypeName: '其他',
      tag: '',
      bxje: 200,
      ybje: 200,
      fyls: 1,
      fyft: 1,
      fj: 3,
    },
  ];
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
    let tran = 0;
    const hasRote = this.myImg.nativeElement.style.transform.indexOf('rotate(');
    if (hasRote >= 0) {
      const transform = this.myImg.nativeElement.style.transform;
      tran = parseInt(transform.substr(transform.indexOf('(') + 1), 10);
    }

    this.myImg.nativeElement.style.transform = 'rotate(' + (tran + 90) + 'deg)';
  }
  rightRotate() {
    this.myImg.nativeElement.style.transform = 'rotate(-90deg)';

  }
  aa() {
    const drag = this.myImg.nativeElement;
    drag.onmousedown = function (event) {
      const e = event || window.event;
      const diffx = e.clientX - drag.offsetLeft;
      const diffy = e.clientY - drag.offsetTop;
      if (typeof drag.setCapture !== 'undefined') {
        drag.setCapture();
      }
      drag.onmousemove = function (event1) {
        const e1 = event1 || window.event;
        const movex = e1.clientX - diffx;
        const movey = e1.clientY - diffy;
        drag.style.left = movex + 'px';
        drag.style.top = movey + 'px';
      };
      drag.onmouseup = function (event2) {
        const e2 = event2 || window.event;
        this.onmousemove = null;
        this.onmouseup = null;
      };
    };
  }
}
