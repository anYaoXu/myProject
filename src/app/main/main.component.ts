import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
          row: 2,
          isCheckedBox: true,
        },
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
      id: 1,
      a: '一年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    },
    {
      id: 2,
      a: '二年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    },
    {
      id: 3,
      a: '三年级',
      b: 10,
      c: 20,
      d: 30,
      e: 44,
      f: 55,
      g: 66
    }
  ];
  isAllChecked = false;
  mapOfCheckId: { [key: string]: boolean } = {};
  isShowCheckBox = true;
  timePeriods = [
    '1age',
    '2age',
    '3age',
    '4age',
    '5age',
    '6age',
    '7age',
    '8age',
    '9age',
    '10age',
    '11age',
    '12age',
    '13age',
    '14age',
    '15age',
    '16age',
    '17age',
    '18age',
    '19age',
  ];
  movies = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
  ];
  lists = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
  ];
  constructor() { }

  ngOnInit() {
  }
  onCheckAll(value) {
    console.log(value);
  }
  drop1(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
