import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  header = [
    {
      list: [
        {
          title: '年级',
          row: 2,
          isSort: true,
          keyName: 'name'
        },
        {
          title: '平均分',
          col: 3
        },
        {
          title: '人数',
          col: 3
        }
      ]
    },
    {
      list: [
        {
          title: '一班'
        },
        {
          title: '二班'
        },
        {
          title: '三班'
        },
        {
          title: '一班'
        },
        {
          title: '二班'
        },
        {
          title: '三班',
        }
      ]
    }
  ];
  columnlist = [
    {
      field: 'a',
    },
    {
      field: 'b',
    },
    {
      field: 'c',
    },
    {
      field: 'd',
    },
    {
      field: 'e',
    },
    {
      field: 'f',
    },
    {
      field: 'g',
    }


  ];
  tableData = [
    {
      a: '一年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    },
    {
      a: '二年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    },
    {
      a: '三年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
