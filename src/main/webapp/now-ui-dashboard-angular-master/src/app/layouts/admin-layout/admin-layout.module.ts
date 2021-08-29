import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserComponent } from '../../user/list/user.component';
import { UserUpdateComponent } from '../../user/update/user-update.component';
import { UserDeleteDialogComponent } from '../../user/delete/user-delete-dialog';
import { CatalogoLibrosDeleteDialogComponent } from '../../catalogolibros/delete/catalogolibros-delete-dialog';
import { CatalogoLibrosComponent } from '../../catalogolibros/list/catalogolibros.component'
import { CatalogoLibrosUpdateComponent } from '../../catalogolibros/update/catalogolibros-update.component';
import {RetiroComponent} from "../../prestamos/retiro/retiro.component";
import {CatalogoLibrosSearchComponent} from "../../catalogolibros/search/catalogoLibros-search.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ChartsModule,

    NgbModule,
    ToastrModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    CatalogoLibrosComponent,
    CatalogoLibrosUpdateComponent,
    UserComponent,
    CatalogoLibrosSearchComponent,
    RetiroComponent,
    UserDeleteDialogComponent,
    CatalogoLibrosDeleteDialogComponent,
    UserUpdateComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ],
  entryComponents: [UserDeleteDialogComponent, CatalogoLibrosDeleteDialogComponent],
})

export class AdminLayoutModule {}
