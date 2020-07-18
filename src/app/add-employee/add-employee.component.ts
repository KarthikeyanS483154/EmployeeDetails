/**
 * This is add employee component ts file which used to pass the employee data to web service to store into the database
 * 
 * @author Karthikeyan 16/07/2020
 * @version 1.0
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators';
import { EmployeeService } from './../employee/employee.service';
import { Employee } from './../employee/employee';
import { AppConstants } from './../util/app-constants.component';

@Component({
    selector: "add-employee-list",
    templateUrl: "./add-employee.component.html",
    styleUrls: ["./add-employee.component.css"]
})

//Add employee component
export class AddEmployeeComponent implements OnInit {
    employee: Employee = new Employee();

    addEmployeeForm: FormGroup;
    submitted = false;
    showServerError: boolean;
    serverError: any;

    phoneNumberPattern = AppConstants.PHONE_NUMBER_PATTERN;
    emailPattern = AppConstants.EMAIL_PATTERN;

    /**
     * Set the data into the class constrctor
     * @param employeeService  - Employee service
     * @param router  - Router
     * @param formBuilder - Form Builder
     */
    constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) { }

    /**
   * Invoke when page getting loaded
   */
    ngOnInit() {
        this.addEmployeeForm = this.formBuilder.group({
            firstName: [AppConstants.EMPTY, Validators.required],
            lastName: [AppConstants.EMPTY],
            emailId: [AppConstants.EMPTY, [Validators.required]],
            phoneNumber: [AppConstants.EMPTY, Validators.required],
            dateOfBirth: [AppConstants.EMPTY, Validators.required],
            gender: [AppConstants.EMPTY, Validators.required],
            designation: [AppConstants.EMPTY, Validators.required],
            maritalStatus: [AppConstants.EMPTY, Validators.required],
            bloodGroup: [AppConstants.EMPTY, Validators.required],
            address: [AppConstants.EMPTY, Validators.required]
        });
    }

    /**
     * Method to return current page form object
     */
    get formControl() {
        return this.addEmployeeForm.controls;
    }

    /**
     * Initialize the data
     */
    newEmployee(): void {
        this.submitted = false;
        this.employee = new Employee();
    }

    /**
     * Method to set the employee data from the form when user sumbitted and invoke the web service
     * call to pass the employee data
     */
    add() {
        this.employee.firstName = this.addEmployeeForm.controls.firstName.value;
        this.employee.lastName = this.addEmployeeForm.controls.lastName.value;
        this.employee.emailId = this.addEmployeeForm.controls.emailId.value;
        this.employee.phoneNumber = this.addEmployeeForm.controls.phoneNumber.value;
        this.employee.dateOfBirth = this.addEmployeeForm.controls.dateOfBirth.value;
        this.employee.gender = this.addEmployeeForm.controls.gender.value;
        this.employee.designation = this.addEmployeeForm.controls.designation.value;
        this.employee.maritalStatus = this.addEmployeeForm.controls.maritalStatus.value;
        this.employee.bloodGroup = this.addEmployeeForm.controls.bloodGroup.value;
        this.employee.address = this.addEmployeeForm.controls.address.value;
        this.employeeService.addEmployee(this.employee).pipe(first()).subscribe(
            //Success callback
            data => {
                this.goToList();
            }, error => { // Failure callback
                this.showServerError = true;
                this.serverError = JSON.stringify(error.error.message);
            });

    }

    /**
     * Form submission method
     */
    onSubmit() {
        this.submitted = true;

        if (this.addEmployeeForm.invalid) {
            return;
        }
        this.add();
    }

    /**
     * Method to reset the form and navigate to the employee list page
     */
    onReset() {
        this.submitted = true;
        this.addEmployeeForm.reset();
        this.goToList();
    }

    /**
     * This method used to navigate the current page to employee list page
     */
    goToList() {
        this.router.navigate([AppConstants.EMPLOYEE_LIST_COMPONENT]);

    }
}