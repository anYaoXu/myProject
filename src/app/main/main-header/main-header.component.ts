import { UtilService } from 'src/app/core/util.service';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less']
})
export class MainHeaderComponent implements OnInit {
  emitTitle = '';
  utilTitle = '';
  constructor(
    private mainService: MainService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.mainService.gg.subscribe((data) => {
      this.emitTitle = data;
    });
    this.utilService.globalService.subscribe((data) => {
      this.utilTitle = data;
    });
  }

}
