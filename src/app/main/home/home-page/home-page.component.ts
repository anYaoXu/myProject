import { Component, OnInit } from '@angular/core';

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
  ]
  constructor() { }

  ngOnInit() {
  }

}
