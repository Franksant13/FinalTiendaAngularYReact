/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarraNavComponent } from './barra-nav.component';

describe('BarraNavComponent', () => {
  let component: BarraNavComponent;
  let fixture: ComponentFixture<BarraNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
