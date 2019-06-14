
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDrop } from '@angular/cdk/drag-drop';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HandelImgComponent } from '../handel-img/handel-img.component';

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
  bj = 50;
  clickCount = 1;
  constructor(private modalService: NzModalService) { }

  ngOnInit() {
  }
  showDialog() {
    const modal = this.modalService.create({
      nzTitle: '附件',
      nzContent: HandelImgComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }
}
