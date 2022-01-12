import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forms42Component } from './forms42.component';

describe('Forms42Component', () => {
  let component: Forms42Component;
  let fixture: ComponentFixture<Forms42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forms42Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Forms42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
