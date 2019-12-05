import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggeestionListItemComponent } from './suggestion-list/suggestion-list-item/suggestion-list-item.component';
import { MessageComponent } from './chat-window/message/message.component';
import { MaterialModule } from '../core/material/material.module';
import { RoomComponent } from './room.component';
import { FormsModule } from '@angular/forms';


@NgModule({
   imports: [
      MaterialModule,
      FormsModule
   ],
   exports: [
   ],
   declarations: [
      ChatWindowComponent,
      MessageComponent,
      SuggestionListComponent,
      SuggeestionListItemComponent,
      RoomComponent
   ]
})
export class RoomModule { }
