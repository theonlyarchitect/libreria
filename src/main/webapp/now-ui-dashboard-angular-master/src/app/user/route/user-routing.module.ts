import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '../list/user.component';
import { UserUpdateComponent } from '../update/user-update.component';
import { UserRoutingResolveService } from './user-routing-resolve.service';

const provinceRoute: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'new',
    component: UserUpdateComponent,
    resolve: {
      province: UserRoutingResolveService,
    }
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent,
    resolve: {
      province: UserRoutingResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(provinceRoute)],
  declarations: [
  ],
  exports: [RouterModule,
],
})
export class UserRoutingModule {}
