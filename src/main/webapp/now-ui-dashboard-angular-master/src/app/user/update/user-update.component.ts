import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUser, User } from '../user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'usernew',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellidos: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    estado: [null, [Validators.required]],
  });

  constructor(protected userService: UserService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.data);
    this.activatedRoute.data.subscribe(({ user }) => {
      console.log(user);
      this.updateForm(user);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user = this.createFromForm();
    console.log(user);
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(user: IUser): void {
    this.editForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      fechaNacimiento: user.fechaNacimiento,
      estado: user.estado
    });
  }

  protected createFromForm(): IUser {
    console.log(this.editForm.get(['estado'])!.value);
    return {
      ...new User(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidos: this.editForm.get(['apellidos'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value,
      estado: this.editForm.get(['estado'])!.value,
    };
  }
}
