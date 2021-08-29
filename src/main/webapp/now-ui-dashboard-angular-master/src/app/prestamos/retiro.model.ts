import * as dayjs from 'dayjs';
import {IUser} from "../user/user.model";
import {ICatalogoLibros} from "../catalogolibros/catalogolibros.model";

export interface IRetiro {
  usuario?: IUser,
  catalogoLibro?: ICatalogoLibros,
  fechaDeDevolucion?: dayjs.Dayjs;
}

export class Retiro implements IRetiro {
  constructor(public usuario? : IUser, public catalogoLibro? : ICatalogoLibros, public fechaDeDevolucion?: dayjs.Dayjs) {}
}

export function getUserIdentifier(user: IUser): number | undefined {
  return user.id;
}
