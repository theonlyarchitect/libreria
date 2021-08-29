import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserComponent } from '../../user/list/user.component';
import { UserUpdateComponent } from '../../user/update/user-update.component';
import { UserRoutingResolveService } from '../../user/route/user-routing-resolve.service';
import { CatalogoLibrosUpdateComponent } from '../../catalogolibros/update/catalogolibros-update.component';
import { CatalogoLibrosRoutingResolveService } from '../../catalogolibros/route/user-routing-resolve.service';
import { CatalogoLibrosComponent } from '../../catalogolibros/list/catalogolibros.component';
import {RetiroComponent} from "../../prestamos/retiro/retiro.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'catalogoLibros', component: CatalogoLibrosComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'retiro',        component: RetiroComponent},
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {
        path: 'user/new',
        component: UserUpdateComponent,
        resolve: {
          user: UserRoutingResolveService,
        }
    },
    {
        path: 'user/:id/edit',
        component: UserUpdateComponent,
        resolve: {
          user: UserRoutingResolveService,
        }
    },
    {
        path: 'catalogoLibros/new',
        component: CatalogoLibrosUpdateComponent,
        resolve: {
          catalogoLibro: CatalogoLibrosRoutingResolveService,
        }
    },
    {
      path: 'catalogoLibros/:id/edit',
      component: CatalogoLibrosUpdateComponent,
      resolve: {
        catalogoLibro: CatalogoLibrosRoutingResolveService,
      }
  },
];
