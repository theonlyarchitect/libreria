import * as dayjs from 'dayjs';
import { IAutor } from '../autores/autores.model';
import { ITema } from '../temas/temas.model';

export interface ICatalogoLibros {
    id?: number;
    titulo?: string;
    fechaLanzamiento?: dayjs.Dayjs;
    inventario?: number;
    editorial?: string;
    autor?: string;
    tematica?: string;
    autores?: IAutor[] | null;
    temas?: ITema[] | null;
  }
  
  export class CatalogoLibros implements ICatalogoLibros {
    constructor(public id?: number, public titulo?: string, public fechaLanzamiento?: dayjs.Dayjs, public inventario?: number, public editorial?: string, public autor? : string, public tematica? : string, public autores?: IAutor[],public temas?: ITema[]) {}
  }
  
  export function getCatalogoLibrosIdentifier(catalogoLibro: ICatalogoLibros): number | undefined {
    return catalogoLibro.id;
  }
  