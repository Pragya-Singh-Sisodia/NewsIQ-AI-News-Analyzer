import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedInsights } from './saved-insights';

describe('SavedInsights', () => {
  let component: SavedInsights;
  let fixture: ComponentFixture<SavedInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
