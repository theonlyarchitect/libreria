import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUser } from '../user.model';
import { UserDeleteDialogComponent } from '../delete/user-delete-dialog';
import { UserService } from '../service/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users?: IUser[];
  isLoading = false;

  constructor(protected userService: UserService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.userService.getAll().subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.isLoading = false;
        this.users = res.body ?? [];
        //console.log(this.users);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IUser): number {
    return item.id!;
  }

  delete(user: IUser): void {
    const modalRef = this.modalService.open(UserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
