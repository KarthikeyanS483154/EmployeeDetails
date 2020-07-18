/**
*  This employee component file is a unit testing file related to employee component.
 * 
 * @author Karthikeyan
 * @version 1.0
 */
import { Employee } from './employee'

describe('Employee', () => {
    it('should create an instance', () => {
        expect(new Employee).toBeTruthy();
    });
});