import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Employee, Employees } from './employee';
import { AuthService } from './../../../../../_services/auth.service';
import { HttpService } from './../../../../../auth/_services/http.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-new-employee',
    templateUrl: './new-employee.component.html',
    styles: []
})
export class NewEmployeeComponent implements OnInit, AfterViewInit {

    employee: Employee;
    employees: Employees;
    employeeForm: FormGroup;
    token: string | boolean;


    constructor(private http: HttpService, private auth: AuthService, private fb: FormBuilder) {
        this.employees = new Employees();
        this.employee = this.employees.init();
        this.employeeForm = this.createForm();
        this.employeeForm.controls.visibility.valueChanges.subscribe(val => {
            if (val === 2) {
                this.employeeForm.get('users').setValidators([Validators.required, Validators.minLength(1)]);
                this.employeeForm.get('users').setErrors(Validators.required);
            } else {
                this.employeeForm.get('users').setValidators(null);
            }
        });
    }

    initAddress(): FormGroup {
        return this.fb.group({
            address_type: ['Mailing Address', Validators.required],
            address_line: ['', Validators.required],
            city: '',
            zip_code: '',
            state: '',
            country: '',
        });
    }

    createForm(): FormGroup {
        return this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            company_name: ['', Validators.required],
            job_title: ['', Validators.required],
            phone: '',
            home_phone: '',
            website: '',
            fax: '',
            facebook: '',
            google: '',
            linkedin: '',
            twitter: '',
            address: this.fb.array([
                this.initAddress(),
            ]),
            visibility: [1, Validators.required],
            users: null,
            activation_link: false

        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    addEmployee(form: FormGroup) {
        if (form.valid) {
            this.http.post('employees/add', form.getRawValue).subscribe(val => {
                this.reset();
            });
        }
    }

    reset() {
        this.employeeForm.reset();
        this.employeeForm.get('visibility').setValue(1);

    }

}
