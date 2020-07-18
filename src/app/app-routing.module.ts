/**
 * This is a ts file is to declare list of routings required and their respective components for those routings
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AppConstants } from './util/app-constants.component';


const routes: Routes = [
  { path: "", redirectTo: 'employees', pathMatch: 'full' },
  { path: "employees", component: EmployeeListComponent, data: { header: AppConstants.LIST_PAGE_NAME, page: "list" } },
  { path: "add", component: AddEmployeeComponent, data: { header: AppConstants.ADD_EMPLOYEE_PAGE_NAME, page: "add" } },
  { path: "update/:id", component: UpdateEmployeeComponent, data: { header: AppConstants.UPDATE_EMPLOYEE_PAGE_NAME, page: "update" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
