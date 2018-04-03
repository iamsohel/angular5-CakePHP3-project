import { AppConfig } from './../../../../_config/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../../_services/auth.service';
import { ScriptLoaderService } from './../../../../_services/script-loader.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesComponent implements OnInit {
    config: AppConfig;

    constructor(private _script: ScriptLoaderService, private authS: AuthService, private router: Router) {
        this.config = new AppConfig();
    }
    ngOnInit() {

    }

}