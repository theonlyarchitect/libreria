import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteDialogComponent } from './delete/user-delete-dialog';
import { UserComponent } from './list/user.component';
import { UserRoutingModule } from './route/user-routing.module';
import { UserUpdateComponent } from './update/user-update.component';


@NgModule({
  imports: [CommonModule, 
    UserRoutingModule, NgbModule, FormsModule],
  declarations: [
    
  ],
  entryComponents: [UserDeleteDialogComponent],
})
export class UserModule {}
