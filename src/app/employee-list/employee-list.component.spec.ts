/**
 * This EmployeeListComponent file is a unit testing file related to empployee list component. 
 * This file is used along with other unit tests. 
 * It is run from Angular CLI by the command ng test.
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
    let component: EmployeeListComponent;
    let fixture: ComponentFixture<EmployeeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EmployeeListComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
