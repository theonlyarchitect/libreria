import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICatalogoLibros } from '../catalogolibros.model';
import { CatalogoLibrosDeleteDialogComponent } from '../delete/catalogolibros-delete-dialog';
import { CatalogoLibrosService } from '../service/catalogolibros.service';

@Component({
  selector: 'catalogoLibros',
  templateUrl: './catalogolibros.component.html',
})
export class CatalogoLibrosComponent implements OnInit {
  catalogoLibrosTable?: ICatalogoLibros[];
  isLoading = false;

  constructor(protected catalogoLibrosService: CatalogoLibrosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.catalogoLibrosService.getAll().subscribe(
      (res: HttpResponse<ICatalogoLibros[]>) => {
        this.isLoading = false;
        this.catalogoLibrosTable = res.body ?? [];
        console.log(this.catalogoLibrosTable);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICatalogoLibros): number {
    return item.id!;
  }

  delete(catalogoLibroInstance: ICatalogoLibros): void {
    console.log(catalogoLibroInstance);
    const modalRef = this.modalService.open(CatalogoLibrosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.catalogoLibroInstance = catalogoLibroInstance;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
