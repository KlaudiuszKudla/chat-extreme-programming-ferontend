import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSentRequestComponent } from './friend-sent-request.component';

describe('FriendSentRequestComponent', () => {
  let component: FriendSentRequestComponent;
  let fixture: ComponentFixture<FriendSentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendSentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendSentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
