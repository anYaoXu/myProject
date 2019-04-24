import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'myProject';
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
  ]
}
