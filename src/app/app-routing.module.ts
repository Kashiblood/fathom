import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FurryFriendsComponent } from './furry-friends/furry-friends.component';
import { HouseComponent } from './house/house.component';

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
  },
  {
    path: '',
    redirectTo: '/house',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    component: HouseComponent,
    data: {
      label: 'My House',
      animation: 'house'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
