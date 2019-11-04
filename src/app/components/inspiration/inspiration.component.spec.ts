import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationComponent } from './inspiration.component';

describe('InspirationComponent', () => {
  let component: InspirationComponent;
  let fixture: ComponentFixture<InspirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspirationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
