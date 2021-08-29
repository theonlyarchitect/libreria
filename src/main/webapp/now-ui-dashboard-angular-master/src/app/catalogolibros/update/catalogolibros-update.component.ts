import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICatalogoLibros, CatalogoLibros } from '../catalogolibros.model';
import { CatalogoLibrosService } from '../service/catalogolibros.service';

@Component({
  selector: 'catalolibros',
  templateUrl: './catalogolibros-update.component.html',
})
export class CatalogoLibrosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    titulo: [null],
    fechaLanzamiento: [null],
    inventario: [null],
    editorial: [null],
    tematica: [null],
    autor: [null]
    
  });

  constructor(protected userService: CatalogoLibrosService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.data);
    this.activatedRoute.data.subscribe(({ catalogoLibro }) => {
      this.updateForm(catalogoLibro);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const catalogoLibros = this.createFromForm();
    console.log(catalogoLibros);
    if (catalogoLibros.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(catalogoLibros));
    } else {
      this.subscribeToSaveResponse(this.userService.create(catalogoLibros));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICatalogoLibros>>): void {
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

  protected updateForm(catalogoLibros: ICatalogoLibros): void {
    this.editForm.patchValue({
      id: catalogoLibros.id,
      titulo: catalogoLibros.titulo,
      fechaLanzamiento: catalogoLibros.fechaLanzamiento,
      inventario: catalogoLibros.inventario,
      editorial: catalogoLibros.editorial,
      tematica: catalogoLibros.tematica,
      autor: catalogoLibros.autor
    });
  }

  protected createFromForm(): ICatalogoLibros {
    //console.log(this.editForm.get(['estado'])!.value);
    return {
      ...new CatalogoLibros(),
      id: this.editForm.get(['id'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      fechaLanzamiento: this.editForm.get(['fechaLanzamiento'])!.value,
      inventario: this.editForm.get(['inventario'])!.value,
      editorial: this.editForm.get(['editorial'])!.value,
      tematica: this.editForm.get(['tematica'])!.value,
      autor: this.editForm.get(['autor'])!.value
    };
  }
}
