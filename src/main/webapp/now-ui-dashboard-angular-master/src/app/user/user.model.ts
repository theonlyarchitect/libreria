import * as dayjs from 'dayjs';

export interface IUser {
    id?: number;
    nombre?: string;
    apellidos?: string;
    fechaNacimiento?: dayjs.Dayjs;
    estado?: string;
  }
  
  export class User implements IUser {
    constructor(public id?: number, public nombre?: string,public apellidos?: string,public fechaNacimiento?: dayjs.Dayjs, public estado?: string) {}
  }
  
  export function getUserIdentifier(user: IUser): number | undefined {
    return user.id;
  }
  