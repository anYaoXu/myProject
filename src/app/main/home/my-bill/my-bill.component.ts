import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bill',
  templateUrl: './my-bill.component.html',
  styleUrls: ['./my-bill.component.less']
})
export class MyBillComponent implements OnInit {
  array = [1, 2, 3, 4];
  dotPosition = 'true';
  effect = 'scrollx';
  config = {
    list: [
      {
        label: '列表',
        type: 'xxxxx'
      },
      {
        label: '列表1',
        type: 'xxxxx'
      }
    ]
  };
  testArr = [
    {
      name: 'zhangsan',
      age: 17
    },
    {
      name: 'lisi',
      age: 18
    },
    {
      name: 'wangwu',
      age: 17
    },
    {
      name: 'wangwu',
      age: 19
    },
    {
      name: 'wangwu',
      age: 11
    }
  ];
  testArr1 = ['zhangsan', 'lisi', 'wangwu', 'wangwu'];
  constructor() { }

  ngOnInit() {
    // console.log(this.unique(this.testArr1));

    // console.log(this.unique2(this.testArr, 'age'));

    // console.log(this.unique3(this.testArr, 'age'));

    // console.log(this.sorta(this.testArr, 'name'));

    // console.log(this.sorta(this.testArr, true, 'name', 'age'));

    // console.log(this.sorta(this.testArr, 'age'));
  }

  click1(index) {
    console.log(index);
  }

}
