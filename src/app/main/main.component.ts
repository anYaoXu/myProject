import { CoreService } from './../core/core.service';
import { CoreModule } from './../core/core.module';
import { MainService } from './main.service';
import { UtilService } from './../core/util.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { navListKey, homeMenuListKey, customMenuListKey } from '../shared/shared.model';
import { Router } from '@angular/router';
import { homeMenuList } from './main.mode';
import { NzModalService } from 'ng-zorro-antd';
declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  navList = []; // 第一级菜单
  menuList = []; // 二级菜单
  currentNav; // 当前导航栏
  currentItem; // 当前菜单
  breadcrumbList = [];  // 面包屑
  isCollapsed = false;
  width = 200;
  isReverseArrow = false;
  constructor(
    private mainService: MainService,
    private router: Router,
    private coreService: CoreService,
    private modalService: NzModalService
  ) { }
  ngOnInit() {
    this.init();
  }
  init() {
    // 路由改变时 改变导航栏状态
    this.coreService.routeChangeEvent
      .subscribe(() => {
        this.modalService.closeAll();
        this.initNavList();
        this.initMenuList();
      });
    this.initNavList();
    this.initMenuList();
  }
  initNavList() {
    this.navList = $.extend(true, [], this.mainService.getMenuList(navListKey));
    // 激活当前导航栏
    const url = this.router.routerState.snapshot.url;
    if (url.endsWith('/main') || url.includes('/main/home')) {
      this.currentNav = this.navList.find(item => item.isHome);
      this.currentNav.isActive = true;
    } else {
      this.navList.forEach(item => {
        if (!item.isHome && url.indexOf(item.router) === 0) {
          this.currentNav = item;
          item.isActive = true;
        }
      });
    }
  }
  initMenuList() {
    this.getMenuList();
  }
  getMenuList() {
    let menuList = [];
    this.breadcrumbList = [];
    if (this.currentNav) {
      switch (this.currentNav.code) {
        case 'home':
          menuList = this.mainService.getMenuList(homeMenuListKey);
          break;
        case 'custom':
          menuList = this.mainService.getMenuList(customMenuListKey);
          break;
      }
    }
    this.menuList = $.extend(true, [], menuList);
  }
  onClickNav(item) {

  }
  onClickItem(item) {
    this.currentItem = item;
    this.menuList.map(value => {
      value.isActive = (item.code === value.code);
      if (value.children) {
        value.children.map(v => v.isActive = item.code = v.code);
      }
    });
    this.router.navigate([item.route + (item.params || '')]);
  }
}
