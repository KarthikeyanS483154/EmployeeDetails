/**
 * This is update employee component ts file which used to update the employee data for the existing information which
 * present in the database using web service call
 * 
 * @author Karthikeyan 16/07/2020
 * @version 1.0 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeService } from './../employee/employee.service';
import { Employee } from './../employee/employee';
import { first } from 'rxjs/operators';
import { AppConstants } from './../util/app-constants.component';

@Component({
    selector: "update-employee-list",
    templateUrl: "./update-employee.component.html",
    styleUrls: ["./update-employee.component.css"]
})

//Update employee component
export class UpdateEmployeeComponent implements OnInit {
    employee: Employee;
    employeeId: string;
    showServerError: boolean;
    serverError: any;
    updateEmployeeForm: FormGroup;
    submitted = false;

    phoneNumberPattern = AppConstants.PHONE_NUMBER_PATTERN;
    emailPattern = AppConstants.EMAIL_PATTERN;

    /**
    * Set data into the constrctor
    * @param route - Activated route
    * @param router - Router
    * @param employeeService - Employee service
    */
    constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService,
        private formBuilder: FormBuilder) {
        this.employeeId = router.url.replace("/update/", AppConstants.EMPTY);
    }

    /**
    * Invoke when page getting loaded 
    * Form field validation
    */
    ngOnInit() {
        this.updateEmployeeForm = this.formBuilder.group({
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

        this.employee = new Employee();

        this.employeeId = this.route.snapshot.params['id'];
        this.employeeService.getEmployeeDetail(this.employeeId)
            .pipe(first())
            .subscribe(data => {
                this.employee = data;
                if (data && data.employee) {
                    this.updateEmployeeForm.patchValue({
                        firstName: data.employee.firstName,
                        lastName: data.employee.lastName,
                        emailId: data.employee.emailId,
                        phoneNumber: data.employee.phoneNumber,
                        dateOfBirth: data.employee.dateOfBirth,
                        gender: data.employee.gender,
                        designation: data.employee.designation,
                        maritalStatus: data.employee.maritalStatus,
                        bloodGroup: data.employee.bloodGroup,
                        address: data.employee.address
                    });
                } else {
                    this.showServerError = true;
                    this.serverError = AppConstants.DATA_ERROR_0;
                }
            }, error => {
                this.showServerError = true;
                this.serverError = JSON.stringify(error.error.message);
            });
    }

    /**
     * Method to return current page form object
     */
    get formControl() {
        return this.updateEmployeeForm.controls;
    }

    /**
     * Method to set the employee data from the form when user sumbitted and invoke the web service
     * call to pass the employee data
     */
    updateEmployee() {
        this.employee.employeeId = this.employeeId;
        this.employee.firstName = this.updateEmployeeForm.controls.firstName.value;
        this.employee.lastName = this.updateEmployeeForm.controls.lastName.value;
        this.employee.emailId = this.updateEmployeeForm.controls.emailId.value;
        this.employee.phoneNumber = this.updateEmployeeForm.controls.phoneNumber.value;
        this.employee.dateOfBirth = this.updateEmployeeForm.controls.dateOfBirth.value;
        this.employee.gender = this.updateEmployeeForm.controls.gender.value;
        this.employee.designation = this.updateEmployeeForm.controls.designation.value;
        this.employee.maritalStatus = this.updateEmployeeForm.controls.maritalStatus.value;
        this.employee.bloodGroup = this.updateEmployeeForm.controls.bloodGroup.value;
        this.employee.address = this.updateEmployeeForm.controls.address.value;
        this.employeeService.updateEmployee(this.employee)
            .pipe(first())
            .subscribe(data => { //Success callback
                this.goToList();
            }, error => {  // Failure callback
                this.showServerError = true;
                this.serverError = JSON.stringify(error.error.message);
            });
    }

    /**
     * Form submission method
     */
    onSubmit() {
        this.submitted = true;
        if (this.updateEmployeeForm.invalid) {
            return;
        }
        this.updateEmployee();
    }

    /**
     * Method to reset the form and navigate to the employee list page
     */
    onReset() {
        this.submitted = true;
        this.updateEmployeeForm.reset();
        this.goToList();
    }

    /**
    * This method used to navigate the current page to employee list page
    */
    goToList() {
        this.router.navigate([AppConstants.EMPLOYEE_LIST_COMPONENT]);
    }
}