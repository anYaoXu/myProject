
import { Component, OnInit } from '@angular/core';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private coreService: CoreService) {
  }
  title = 'myProject';
  ngOnInit() {
    this.coreService.watchRoute();
    this.coreService.initTranslateConfig();
  }
}
