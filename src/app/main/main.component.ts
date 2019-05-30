import { MainService } from './main.service';
import { UtilService } from './../core/util.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { navListKey, homeMenuListKey } from '../shared/shared.model';
import { Router } from '@angular/router';
import { homeMenuList } from './main.mode';
declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  nvaList = []; // 第一级菜单
  menuList = []; // 二级菜单
  currentNav; // 当前导航栏
  currentItem; // 当前菜单
  breadcrumbList = [];  // 面包屑
  isCollapsed = false;
  width = 200;
  isReverseArrow = false;
  constructor(
    private mainService: MainService,
    private router: Router
  ) { }
  ngOnInit() {
    this.init();
  }
  init() {
    this.initNavList();
    this.initMenuList();
  }
  initNavList() {
    this.nvaList = $.extend(true, [], this.mainService.getMenuList(navListKey));
    // 激活当前导航栏
    const url = this.router.routerState.snapshot.url;
    // if (url.endsWith('/main') || url.includes('/main/home')) {
    //   this.currentNav = this.nvaList.find(item => item.isHome);
    //   this.currentNav.isActive = true;
    // } else {
    //   this.nvaList.forEach(item => {
    //     if (!item.isHome && url.indexOf(item.router) === 0) {
    //       this.currentNav = item;
    //       item.isActive = true;
    //     }
    //   });
    // }
  }
  initMenuList() {
    this.getMenuList();
  }
  getMenuList() {
    let menuList = [];
    this.breadcrumbList = [];
    menuList = this.mainService.getMenuList(homeMenuListKey);
    this.menuList = $.extend(true, [], menuList);
  }
}
