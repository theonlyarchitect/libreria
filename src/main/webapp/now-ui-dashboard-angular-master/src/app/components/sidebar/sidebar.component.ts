import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/catalogoLibros', title: 'Sistema de Libros',  icon: 'education_agenda-bookmark', class: '' },
    { path: '/user', title: 'Sistema de Usuarios',  icon:'users_single-02', class: '' },
    { path: '/catalogoLibrosSearch', title: 'Sistema de Busqueda',  icon:'ui-1_zoom-bold', class: '' },
    { path: '/retiro', title: 'Solicitud de prestamo',  icon:'shopping_cart-simple', class: '' },
    { path: '/devolucion', title: 'Devolucion de Libro',  icon:'loader_refresh', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
