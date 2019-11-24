import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCardComponent } from './forum-card.component';

describe('ForumCardComponent', () => {
  let component: ForumCardComponent;
  let fixture: ComponentFixture<ForumCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
