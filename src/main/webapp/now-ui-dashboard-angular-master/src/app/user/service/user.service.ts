import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, getUserIdentifier } from '../user.model';

export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class UserService {
  protected resourceUrl = "http://localhost:8080/api/Usuario"

  constructor(protected http: HttpClient) {}

  create(user: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(`${this.resourceUrl}/${getUserIdentifier(user) as number}`, user, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUser[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
