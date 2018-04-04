import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEmployeeComponent } from './new-employee.component';
import { AuthService } from '../../../../../_services/auth.service';
import { HttpService } from '../../../../../auth/_services/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInspectorService } from '../../../../../_services/http-inspector.servce';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../../../../layouts/form-error/form-error.module';

const routes : Routes =[
  {
    'path':'',
    'component' : NewEmployeeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormErrorModule
  ],
  declarations: [NewEmployeeComponent],
  bootstrap: [NewEmployeeComponent],
  providers: [
    AuthService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInspectorService,
      multi: true
    }],
  exports: [RouterModule]
})
export class NewEmployeeModule { }
