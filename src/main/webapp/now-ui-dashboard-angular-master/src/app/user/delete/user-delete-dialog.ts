import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { IUser } from '../user.model';


@Component({
  templateUrl: './user-delete-dialog.html',
})
export class UserDeleteDialogComponent {
  user?: IUser;

  constructor(protected provinceService: UserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provinceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
