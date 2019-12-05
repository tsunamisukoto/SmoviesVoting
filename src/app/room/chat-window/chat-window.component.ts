import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { RoomChatMessageModel, RoomMessageService } from './room-message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {

  constructor(readonly service: RoomMessageService, readonly cdr: ChangeDetectorRef) { }
  messages: Array<RoomChatMessageModel>;
  formData;
  @Input() roomId: number;
  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages(): void {
    this.formData = {};
    this.service.getMessages(this.roomId).then(messages => {
      this.messages = messages;
      this.cdr.markForCheck();
    });
  }
  onEnter(): void {
    this.service.sendMessage(this.roomId, this.formData.message).then(() => this.loadMessages());
  }

}
