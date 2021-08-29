import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICatalogoLibros, CatalogoLibros } from '../catalogolibros.model';
import { CatalogoLibrosService} from '../service/catalogolibros.service';

@Injectable({ providedIn: 'root' })
export class CatalogoLibrosRoutingResolveService implements Resolve<ICatalogoLibros> {
  constructor(protected service: CatalogoLibrosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICatalogoLibros> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      console.log(id);
      return this.service.find(id).pipe(
        mergeMap((user: HttpResponse<ICatalogoLibros>) => {
          if (user.body) {
            return of(user.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CatalogoLibros());
  }
}
