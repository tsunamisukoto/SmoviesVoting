import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomListItemComponent } from './room-list/room-list-item/room-list-item.component';
import { GroupListItemComponent } from './group/group-list-item/group-list-item.component';
import { GroupListComponent } from './group/group-list.component';
import { GroupComponent } from './group/group/group.component';
import { MaterialModule } from '../core/material/material.module';
import { GroupEditModalComponent } from './group/group-edit-modal/group-edit-modal.component';
import { FormsModule } from '@angular/forms';
import { RoomEditModalComponent } from './room-list/room-edit-modal/room-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    RoomListComponent,
    RoomListItemComponent,
    GroupListItemComponent,
    GroupListComponent,
    GroupComponent,
    GroupEditModalComponent,
    RoomEditModalComponent
  ],
  entryComponents: [
    GroupEditModalComponent,
    RoomEditModalComponent
  ]
})
export class HomeModule { }
