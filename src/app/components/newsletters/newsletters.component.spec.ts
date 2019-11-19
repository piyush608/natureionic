import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslettersComponent } from './newsletters.component';

describe('NewslettersComponent', () => {
  let component: NewslettersComponent;
  let fixture: ComponentFixture<NewslettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewslettersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
