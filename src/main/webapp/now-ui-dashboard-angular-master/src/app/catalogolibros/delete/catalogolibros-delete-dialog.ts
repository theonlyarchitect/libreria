import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogoLibrosService } from '../service/catalogolibros.service';
import { CatalogoLibros, ICatalogoLibros } from '../catalogolibros.model';


@Component({
  templateUrl: './catalogolibros-delete-dialog.html',
})
export class CatalogoLibrosDeleteDialogComponent {
  catalogoLibroInstance?: ICatalogoLibros;

  constructor(protected provinceService: CatalogoLibrosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provinceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
