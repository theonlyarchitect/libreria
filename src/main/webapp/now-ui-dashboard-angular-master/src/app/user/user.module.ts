import { NgModule } from '@angular/core';
import { UserDeleteDialogComponent } from './delete/user-delete-dialog';
import { UserComponent } from './list/user.component';
import { UserRoutingModule } from './route/user-routing.module';
import { UserUpdateComponent } from './update/user-update.component';


@NgModule({
  imports: [UserRoutingModule],
  declarations: [
    UserComponent,
    UserUpdateComponent,
    UserDeleteDialogComponent,
  ],
  entryComponents: [UserDeleteDialogComponent],
})
export class UserModule {}
