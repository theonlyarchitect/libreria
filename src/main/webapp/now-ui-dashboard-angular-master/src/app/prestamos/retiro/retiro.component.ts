import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {finalize, min} from 'rxjs/operators';

import { ICatalogoLibros, CatalogoLibros } from '../../catalogolibros/catalogolibros.model';
import { CatalogoLibrosService } from '../../catalogolibros/service/catalogolibros.service';
import {IUser} from "../../user/user.model";
import {UserService} from "../../user/service/user.service";
import {IRetiro, Retiro} from "../retiro.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'retiro',
  templateUrl: './retiro.component.html',
})
export class RetiroComponent implements OnInit {
  isSaving = false;

  usuarioShearedCollection: IUser[] = [];
  catalogoLibrosShearedCollection: ICatalogoLibros[] = [];

  editForm = this.fb.group({
    usuario: [null, Validators.required],
    catalogoLibro: [null, Validators.required],
    fechaDeDevolucion: [null, Validators.required]

  });
  minDate: string;

  constructor(private router: Router, private toastr: ToastrService, protected userService: UserService ,protected catalogoLibrosService: CatalogoLibrosService,protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {
    var today = new Date();
    var dd = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.minDate = yyyy + '-' + mm + '-' + dd;
    console.log(this.minDate);
  }

  ngOnInit(): void {

    this.loadRelationshipsOptions();

  }

  previousState(): void {
    window.history.back();
  }

  trackUsuarioById(index: number, item: IUser): number {
    return item.id!;
  }
  trackCatalogoLibrosById(index: number, item: ICatalogoLibros): number {
    return item.id!;
  }

  save(): void {
    this.isSaving = true;
    const retiro = this.createFromForm();
    console.log(retiro.catalogoLibro);
    const id : number = Number(retiro.catalogoLibro);
    this.subscribeToSaveResponse(this.catalogoLibrosService.prestar(id));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICatalogoLibros>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {

      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span><b>Se creo el prestamo de forma exitosa</b>', '', {
        timeOut: 9000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-top-center'
      });
    this.router.navigate(['/catalogoLibros']);  // define your component where you want to go
  }

  protected onSaveError(): void {
    this.toastr.error('<span class="now-ui-icons ui-1_simple-remove"></span><b> Error al registrar el prestamo </b>', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-top-center'
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): IRetiro {
    //console.log(this.editForm.get(['estado'])!.value);
    return {
      ...new Retiro(),
      usuario: this.editForm.get(['usuario'])!.value,
      catalogoLibro: this.editForm.get(['catalogoLibro'])!.value,
      fechaDeDevolucion: this.editForm.get(['fechaDeDevolucion'])!.value
    };
  }

  protected loadRelationshipsOptions() {
    this.userService.getAll().subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.usuarioShearedCollection = res.body ?? [];
        console.log(this.usuarioShearedCollection);
      },
      () => {
      }
    );

    this.catalogoLibrosService.inExistence().subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.catalogoLibrosShearedCollection = res.body ?? [];
        console.log(this.catalogoLibrosShearedCollection);
      },
      () => {
      }
    );

  }
}
