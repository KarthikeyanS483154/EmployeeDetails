/**
 * This Add Employee Component file is a unit testing file related to add employee component. 
 * This file is used along with other unit tests. 
 * It is run from Angular CLI by the command ng test.
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AddEmployeeComponent } from './add-employee.component';

describe('AddEmployeeComponent', () => {
    let component: AddEmployeeComponent;
    let fixture: ComponentFixture<AddEmployeeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddEmployeeComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(AddEmployeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
