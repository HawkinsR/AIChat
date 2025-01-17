import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedChatComponent } from './advanced-chat.component';

describe('AdvancedChatComponent', () => {
  let component: AdvancedChatComponent;
  let fixture: ComponentFixture<AdvancedChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
