import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEnterpriseComponent } from './my-enterprise.component';

describe('MyEnterpriseComponent', () => {
  let component: MyEnterpriseComponent;
  let fixture: ComponentFixture<MyEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
