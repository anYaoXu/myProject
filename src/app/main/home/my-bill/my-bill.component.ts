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
  constructor() { }

  ngOnInit() {
  }

  click1(index) {
    console.log(index);
  }
}
