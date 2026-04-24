import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnimationsLabComponent } from './animations-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AnimationsLabComponent', () => {
  let component: AnimationsLabComponent;
  let fixture: ComponentFixture<AnimationsLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationsLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimationsLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
