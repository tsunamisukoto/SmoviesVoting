import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      UserListComponent,
      ModalComponent
   ]
})
export class SharedModule { }
