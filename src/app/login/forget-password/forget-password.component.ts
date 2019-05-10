import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
    console.log('ssssss', this.data);
  }

}
