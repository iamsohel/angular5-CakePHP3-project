import { EmployeesComponent } from './employees.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../layouts/layout.module';

const routes: Routes = [
    {
        "path": "",
        "component": EmployeesComponent,
    
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeesComponent
    ]
})
export class EmployeesModule {}