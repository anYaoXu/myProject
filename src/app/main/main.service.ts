import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  gg = new EventEmitter();
  constructor() { }
  getMenuList(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
