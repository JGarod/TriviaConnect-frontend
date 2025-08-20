import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavArribaComponent } from './nav-arriba.component';

describe('NavArribaComponent', () => {
  let component: NavArribaComponent;
  let fixture: ComponentFixture<NavArribaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavArribaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavArribaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
