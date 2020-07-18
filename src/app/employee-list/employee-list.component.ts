/**
 * This is list employee component ts file which used to display the employee data on the ag-grid table.
 * 
 * @author Karthikeyan 16/07/2020
 * @version 1.0 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee/employee.service';
import { first } from 'rxjs/operators';
import { ActionEmployeeRenderer } from '../renderer/action-employee-renderer.component';
import { GridOptions } from 'ag-grid-community';
import { AppConstants } from './../util/app-constants.component';

@Component({
    selector: "app-employee-list",
    templateUrl: "./employee-list.component.html",
    styleUrls: ["./employee-list.component.css"]
})

//Employee list component
export class EmployeeListComponent implements OnInit {

    employees: Array<any> = new Array<any>();
    gridOptions: GridOptions;
    columnDefs: any[]
    rowData: any[];
    tooltipShowDelay;
    paginationPageSize;

    constructor(private employeeService: EmployeeService, private router: Router) {
        this.gridOptions = <GridOptions>{};
        this.columnDefs = [
            { headerName: 'ID', field: 'employeeId', sortable: true, resizable: true, width: 110 },
            { headerName: 'First name', field: 'firstName', sortable: true, resizable: true, width: 110, tooltipField: 'firstName' },
            { headerName: 'Last name', field: 'lastName', sortable: true, resizable: true, width: 100, tooltipField: 'lastName' },
            { headerName: 'Email ID', field: 'emailId', sortable: true, resizable: true, width: 200, tooltipField: 'emailId' },
            { headerName: 'Phone', field: 'phoneNumber', sortable: false, resizable: true, width: 160, tooltipField: 'phoneNumber' },
            { headerName: 'Designation', field: 'designation', sortable: true, resizable: true, width: 110, tooltipField: 'designation' },
            { headerName: 'DOB', field: 'dob', sortable: false, resizable: true, width: 120 },
            { headerName: 'Gender', field: 'gender', sortable: true, resizable: true, width: 110, tooltipField: 'gender' },
            { headerName: 'Marital status', field: 'martialStatus', sortable: true, resizable: true, width: 110, tooltipField: 'martialStatus' },
            { headerName: 'Blood group', field: 'bloodGroup', sortable: true, resizable: true, width: 110, tooltipField: 'bloodGroup' },
            { headerName: 'Address', field: 'address', sortable: false, resizable: true, width: 250, tooltipField: 'address' },
            {
                headerName: "Action", field: 'action', sortable: false, cellRenderer: 'actionEmployeeRenderer', colId: 'params',
                width: '180', suppressNavigable: true, editale: false, cellClass: 'no-border'
            },
        ];
        this.tooltipShowDelay = 0;
        this.paginationPageSize = 10;
    }

    /**
    * Invoke when page getting loaded
    */
    ngOnInit() {
        this.reloadData();
    }

    /**
     * Method to invoke the web service call and retrieve the employee data from the success
     * response, if not show alert to user
     */
    reloadData() {
        this.employeeService.getEmployeeList()
            .pipe(first())
            .subscribe(
                data => {//Success callback
                    this.gridOptions.api.setRowData([]);
                    this.gridOptions.api.sizeColumnsToFit();
                    this.employees = data;
                    if (this.employees.length > 0) {
                        this.employees.forEach(element => {
                            let obj = {
                                firstName: element.firstName,
                                lastName: element.lastName,
                                employeeId: element.employeeId,
                                emailId: element.emailId,
                                phoneNumber: element.phoneNumber,
                                dob: element.dateOfBirth,
                                gender: element.gender,
                                designation: element.designation,
                                martialStatus: element.maritalStatus,
                                bloodGroup: element.bloodGroup,
                                address: element.address

                            };
                            this.gridOptions.api.addItems([obj]);
                        });
                    } else {
                        this.gridOptions.api.showNoRowsOverlay();
                    }
                },
                error => {//Failure callback
                    this.gridOptions.api.setRowData([]);
                    console.log(JSON.stringify(error))
                });
    }

    /**
     * This method used to call the web service for to delete employee id from the database based on query
     * parameter
     * @param employeeId - Employee ID
     */
    public deleteEmployee(employeeId: string) {
        this.employeeService.deleteEmployee(employeeId).pipe(first()).subscribe(
            data => {//Success callback
                this.gridOptions.api.setRowData([]);// reset ag-grid table
                this.reloadData(); // Invoke service call to get the data after delete operation success
            },
            error => {// Error callback
                alert(JSON.stringify(error.error.message));
            });
    }

    /**
     * Navigation call for to move update component when action invoked
     * @param employeeId - Employee ID
     */
    public updateEmployee(employeeId: number) {
        this.router.navigate([AppConstants.UPDATE_EMPLOYEE_COMPONENT, employeeId]);
    }

    /**
     * Used to create custom Button
     */
    frameworkComponents = {
        actionEmployeeRenderer: ActionEmployeeRenderer,
    };
}