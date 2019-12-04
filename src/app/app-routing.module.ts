import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './sign-in-page/register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { GroupComponent } from './home/group/group.component';


const routes: Routes = [
   {
      path: '',
      component: SignInPageComponent
   },
   {
      path: 'register',
      component: RegisterComponent
   },
   {
      path: 'home',
      component: HomeComponent
   },
   {
      path: 'room/:id',
      component: RoomComponent
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes),
      FormsModule
   ],
   exports: [
      RouterModule
   ],
   declarations: [
      SignInPageComponent,
      RegisterComponent,
      RoomComponent
   ]
})
export class AppRoutingModule { }
