import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.less']
})
export class TablesComponent implements OnInit {

  @Input() tableData = [];
  @Input() columnlist;
  @Input() header;
  @Input() isShowCheckBox = false;
  mapOfCheckId: { [key: string]: boolean } = {};
  isAllChecked = false;
  ngOnInit() {

  }
  onCheckAll(value) {
    this.tableData.forEach(item => {
      this.mapOfCheckId[item.id] = value;
    });
    console.log(this.isAllChecked);
  }
  refreshStatus() {
    this.isAllChecked = this.tableData.every(item => this.mapOfCheckId[item.id]);
  }

}
