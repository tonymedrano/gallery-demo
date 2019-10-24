import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryScrollComponent } from './gallery-scroll.component';

describe('GalleryScrollComponent', () => {
  let component: GalleryScrollComponent;
  let fixture: ComponentFixture<GalleryScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
