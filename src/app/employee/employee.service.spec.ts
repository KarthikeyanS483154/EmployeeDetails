/**
 * This employee service file is a unit testing file related to employee component.
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { TestBed } from '@angular/core/testing'
import { EmployeeService } from "./employee.service";

describe('EmployeeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: EmployeeService = TestBed.get(EmployeeService);
        expect(service).toBeTruthy();
    });
})