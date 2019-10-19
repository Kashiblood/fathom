import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseComponent } from './house/house.component';
import { FurryFriendsComponent } from './furry-friends/furry-friends.component';

export const routes: Routes = [
  {
    path: 'house',
    component: HouseComponent,
    data: {
      label: 'My House',
      animation: 'house'
    }
  },
  {
    path: 'furry-friends',
    component: FurryFriendsComponent,
    data: {
      label: 'Furry Friends',
      animation: 'furryFriends'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
