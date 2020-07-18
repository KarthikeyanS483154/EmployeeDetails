/**
 * This is ts file used to invoke all the web service operation call such as add, update, delete and get with usinh
 * HttpClient API
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from './employee';
import { AppConstants } from './../util/app-constants.component';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) { }

    /**
     * Add operation service call
     * @param employee - Employee object
     */
    addEmployee(employee: Employee) {
        return this.http.post<any>(AppConstants.API_ENDPOINT, {
            "firstName": employee.firstName,
            "lastName": employee.lastName,
            "designation": employee.designation,
            "emailId": employee.emailId,
            "phoneNumber": employee.phoneNumber,
            "dateOfBirth": employee.dateOfBirth,
            "gender": employee.gender,
            "maritalStatus": employee.maritalStatus,
            "bloodGroup": employee.bloodGroup,
            "address": employee.address
        })
            .pipe(map(data => {
                return data;
            }));
    }

    /**
     * Update operation service call
     * @param employee - Employee object
     */
    updateEmployee(employee: Employee) {
        return this.http.put<any>(AppConstants.API_ENDPOINT,
            {
                "employeeId": employee.employeeId,
                "firstName": employee.firstName,
                "lastName": employee.lastName,
                "designation": employee.designation,
                "emailId": employee.emailId,
                "phoneNumber": employee.phoneNumber,
                "dateOfBirth": employee.dateOfBirth,
                "gender": employee.gender,
                "maritalStatus": employee.maritalStatus,
                "bloodGroup": employee.bloodGroup,
                "address": employee.address
            })
            .pipe(map(data => {
                return data;
            }));
    }

    /**
     * Delete operation service call
     * @param employee - Employee object
     */
    deleteEmployee(employeeId: string) {
        return this.http.delete<any>(AppConstants.API_ENDPOINT + AppConstants.FILE_SEPARATOR + employeeId)
            .pipe(map(data => {
                return data;
            }));
    }

    /**
     * Get employee list service call
     */
    getEmployeeList() {
        return this.http.get<any>(AppConstants.API_ENDPOINT);
    }

    /**
     * Get employee service call
     * @param employeeId - Employee ID
     */
    getEmployeeDetail(employeeId: string) {
        return this.http.get<any>(AppConstants.API_ENDPOINT + AppConstants.FILE_SEPARATOR + employeeId);
    }
}