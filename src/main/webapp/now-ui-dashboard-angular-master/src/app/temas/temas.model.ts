
export interface ITema {
    id?: number;
    name?: string;
  }
  
  export class Tema implements ITema {
      constructor(public id?: number, public nombre?: string) {}
  }
  
  export function getTemaIdentifier(tema: ITema): number | undefined {
    return tema.id;
  }
  