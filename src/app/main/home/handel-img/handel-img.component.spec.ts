import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandelImgComponent } from './handel-img.component';

describe('HandelImgComponent', () => {
  let component: HandelImgComponent;
  let fixture: ComponentFixture<HandelImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandelImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandelImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
