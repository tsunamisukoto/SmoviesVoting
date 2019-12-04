import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomListItemComponent } from './room-list/room-list-item/room-list-item.component';
import { GroupListItemComponent } from './group/group-list-item/group-list-item.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, RoomListComponent, RoomListItemComponent, GroupListItemComponent, GroupComponent]
})
export class HomeModule { }
