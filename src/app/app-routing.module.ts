import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './sign-in-page/register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { GroupListComponent } from './home/group/group-list.component';
import { GroupComponent } from './home/group/group/group.component';
import { MaterialModule } from './core/material/material.module';
import { RoomModule } from './room/room.module';
import { ChatWindowComponent } from './room/chat-window/chat-window.component';
import { AuthGuard } from './core/auth-guard';
import { UnAuthGuard } from './core/un-auth-guard';


const routes: Routes = [
   {
      path: '',
      component: SignInPageComponent,
      canActivate: [UnAuthGuard]
   },
   {
      path: 'register',
      component: RegisterComponent,
      canActivate: [UnAuthGuard]
   },
   {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
   },
   {
      path: 'room/:roomId',
      component: RoomComponent,
      canActivate: [AuthGuard]
   },
   {
      path: 'group/:groupId',
      component: GroupComponent,
      canActivate: [AuthGuard]
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes),
      FormsModule,
      MaterialModule,
      RoomModule
   ],
   exports: [
      RouterModule
   ],
   declarations: [
      SignInPageComponent,
      RegisterComponent
   ]
})
export class AppRoutingModule { }
