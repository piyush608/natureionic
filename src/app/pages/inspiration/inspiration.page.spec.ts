import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationPage } from './inspiration.page';

describe('InspirationPage', () => {
  let component: InspirationPage;
  let fixture: ComponentFixture<InspirationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspirationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
