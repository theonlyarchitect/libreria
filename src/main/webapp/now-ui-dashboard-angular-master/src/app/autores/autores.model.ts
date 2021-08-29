
export interface IAutor {
    id?: number;
    name?: string;
  }
  
  export class Autor implements IAutor {
      constructor(public id?: number, public nombre?: string) {}
  }
  
  export function getAutorIdentifier(autor: IAutor): number | undefined {
    return autor.id;
  }
  