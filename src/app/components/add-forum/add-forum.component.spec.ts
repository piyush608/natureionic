import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForumComponent } from './add-forum.component';

describe('AddForumComponent', () => {
  let component: AddForumComponent;
  let fixture: ComponentFixture<AddForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddForumComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
