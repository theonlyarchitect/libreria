import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICatalogoLibros } from '../catalogolibros.model';
import { CatalogoLibrosDeleteDialogComponent } from '../delete/catalogolibros-delete-dialog';
import { CatalogoLibrosService } from '../service/catalogolibros.service';
import {FormBuilder} from "@angular/forms";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'catalogoLibrosSearch',
  templateUrl: './catalogoLibros-search.component.html',
})
export class CatalogoLibrosSearchComponent implements OnInit {
  catalogoLibrosTable?: ICatalogoLibros[];
  isLoading = false;
  filterByString: boolean = false;
  editForm = this.fb.group({
    opcionFiltrado: [],
    stringFilter: [],
    intFilter: []
  });
  filteyByNumber: boolean;
  constructor(protected catalogoLibrosService: CatalogoLibrosService, protected modalService: NgbModal, protected fb: FormBuilder) {

  }

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

  save() {

  }

  onChange(event) {
    let selectedDevice: number =event;
    console.log(selectedDevice);
    switch (Number(selectedDevice)) {
      case 0:
      case 1:
      case 2: {
        console.log("Filtro sin mod");
        this.filterByString = false;
        this.filteyByNumber = false;
        break;
      }
      case 3:
      case 4:
      case 5:
      case 6: {
        console.log("Filtro string");
        this.filterByString = true;
        this.filteyByNumber = false;
        break;
      }
      case 7: {
        console.log("Filtro int");
        this.filterByString = false;
        this.filteyByNumber = true;
        break;
      }
      default:
        console.log("Error");
        break;
    }
  }

  applyFilters() {
    const filterType = this.editForm.get(['opcionFiltrado'])!.value;
    console.log(`${"Filtrando por: "+ filterType}`);
    const  stringFilter = this.editForm.get(['stringFilter'])!.value;
    const  intFilter = this.editForm.get(['intFilter'])!.value;

    switch (Number(filterType)){
      case 0:
        this.catalogoLibrosService.getAll().subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;

      case 1:
        this.catalogoLibrosService.inExistence().subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;

      case 2:
        this.catalogoLibrosService.soldout().subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;

      case 3:
        this.catalogoLibrosService.getByTitle(stringFilter).subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;
      case 4:
        this.catalogoLibrosService.getByTopic(stringFilter).subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;
      case 5:
        this.catalogoLibrosService.getEditorial(stringFilter).subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;
      case 6:
        this.catalogoLibrosService.getByAutor(stringFilter).subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;
      case 7:
        this.catalogoLibrosService.getByAnno(Number(intFilter)).subscribe(
          (res: HttpResponse<ICatalogoLibros[]>) => {
            this.isLoading = false;
            this.catalogoLibrosTable = res.body ?? [];
            console.log(this.catalogoLibrosTable);
          },
          () => {
            this.catalogoLibrosTable =null;
          }
        );
        break;
    }
  }
}
