import { AuthService } from './../../../../_services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import{NewEmployeeComponent} from './new-employee/new-employee.component';
import{EmployeeDetailsComponent} from './employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                path: 'all',
                component: EmployeesComponent
              },
              {
                path: 'add',
                loadChildren: './new-employee/new-employee.module#NewEmployeeModule'
              },
              {
                path: 'details',
                loadChildren: './employee-details/employee-details.module#EmployeeDetailsModule',
              },
              {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full'
              },
              {
                path: '**',
                redirectTo: 'all',
              }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeesComponent
    ],
    providers: [ScriptLoaderService, AuthService],
})
export class EmployeesModule {

}