import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomListItemComponent } from './room-list/room-list-item/room-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, RoomListComponent, RoomListItemComponent]
})
export class HomeModule { }
