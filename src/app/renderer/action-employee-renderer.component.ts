/**
 * This is the custom button renderer ts file which create button on the ag-grid table view.
 * 
 * @author Karthikeyan 16/07/2020
 * @version 1.0
 */
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { EmployeeListComponent } from './../employee-list/employee-list.component';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service'
import { AppConstants } from '../util/app-constants.component';

@Component({
    selector: 'child-cell',
    template: `<button type="button" (click)="invokeUpdateOperation()" class="btn btn-success btn-sm ml-auto mr-1">Edit</button>
  <button type="button" (click)="invokeDeleteOperation()" class="btn btn-danger btn-sm ml-auto mr-1">Delete</button>`,
})

//Action employee renderer class
export class ActionEmployeeRenderer implements ICellRendererAngularComp {
    public params: any;

    /**
     * Set data into the constrctor
     * @param employeeList - Employee list data
     * @param confirmationDialogService - Service of dialog
     */
    constructor(private employeeList: EmployeeListComponent, private confirmationDialogService: ConfirmationDialogService) { }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

    /**
     * Method to invoke update operation when event occurs
     */
    invokeUpdateOperation() {
        this.employeeList.updateEmployee(this.params.data.employeeId);
    }

    /**
     * Method to invoke delete operation when event occurs
     * Confirmation dialog box appears before doing delete operation
     * Ok - true; Cancel - false
     */
    invokeDeleteOperation() {
        this.confirmationDialogService.confirm(AppConstants.DELETE_DIALOG_HEADER, AppConstants.DELETE_DIALOG_MESSAGE)
            .then((confirmed) => {
                if (confirmed) {
                    this.employeeList.deleteEmployee(this.params.data.employeeId);
                }
            })
            .catch(() => console.log('Error'));
    }
}