import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UtilService } from 'src/app/core/util.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

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
  // header = [
  //   {
  //     list: [
  //       { isCheckedBox: true, },
  //       { title: '年级' },
  //       {
  //         title: '一班'
  //       },
  //       {
  //         title: '二班'
  //       },
  //       {
  //         title: '三班'
  //       },
  //       {
  //         title: '一班'
  //       },
  //       {
  //         title: '二班'
  //       },
  //       {
  //         title: '三班',
  //       }
  //     ]
  //   }
  // ];
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
  listOfAllData = [];
  constructor(
    private utilService: UtilService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        disabled: i % 2 === 0
      });
    }
    this.mainService.gg.emit('sssss');
    this.utilService.globalService.emit('utilService1111111');
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
    // console.log(this.lists);
    this.lists = this.resetPositionOfList(this.lists);
  }
  resetPositionOfList(lists, groupNum = 5) {
    const return_list = [];
    const all_list = [];
    lists.map(list => {
      all_list.push(...list);
    });
    let child_list = [];
    all_list.map((item, index) => {
      child_list.push(item);
      if ((index + 1) % 5 === 0) {
        return_list.push(child_list);
        child_list = [];
      }
    });
    console.log(return_list);
    return return_list;
  }
  onFunCallback(event) {
    console.log(event);
    if (event === 'totalScroll') {

    }
  }

}
