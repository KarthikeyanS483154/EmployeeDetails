/**
 * This UpdateEmployeeComponent file is a unit testing file related to update employee component. 
 * This file is used along with other unit tests. 
 * It is run from Angular CLI by the command ng test.
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { UpdateEmployeeComponent } from './update-employee.component';

describe('UpdateEmployeeComponent', () => {
    let component: UpdateEmployeeComponent;
    let fixture: ComponentFixture<UpdateEmployeeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({ 
            declarations: [
                UpdateEmployeeComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(UpdateEmployeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
