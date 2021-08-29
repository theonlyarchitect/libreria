import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatalogoLibros, getCatalogoLibrosIdentifier } from '../catalogolibros.model';

export type EntityResponseType = HttpResponse<ICatalogoLibros>;
export type EntityArrayResponseType = HttpResponse<ICatalogoLibros[]>;

@Injectable({ providedIn: 'root' })
export class CatalogoLibrosService {
  protected resourceUrl = "http://localhost:8080/api/CatalogoLibro"

  constructor(protected http: HttpClient) {}

  create(catalogoLibros: ICatalogoLibros): Observable<EntityResponseType> {
    console.log(catalogoLibros);
    return this.http.post<ICatalogoLibros>(this.resourceUrl, catalogoLibros, { observe: 'response' });
  }

  update(catalogoLibros: ICatalogoLibros): Observable<EntityResponseType> {
    return this.http.put<ICatalogoLibros>(`${this.resourceUrl}/${getCatalogoLibrosIdentifier(catalogoLibros) as number}`, catalogoLibros, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatalogoLibros>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ICatalogoLibros[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
