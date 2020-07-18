/**
 * This file contains various constants that are used throughout the application.
 * 
 * @author Karthikeyan 18/07/2020
 * @version 1.0
 */
export class AppConstants {
    public static API_ENDPOINT = 'http://localhost:8080/employees';
    public static FILE_SEPARATOR = "/";

    public static PHONE_NUMBER_PATTERN = '[0-9+ \-\Q\E()]{10,14}';
    public static EMAIL_PATTERN = '[a-zA-Z_0-9.]{1,100}[@]{1}[a-zA-Z]{1,100}[.]{1}[a-zA-Z0-9]{2,5}';
    public static EMPTY = '';

    public static EMPLOYEE_LIST_COMPONENT = '/employees';
    public static UPDATE_EMPLOYEE_COMPONENT = 'update';

    public static DIALOG_OK = 'Ok';
    public static DIALOG_CANCEL = 'Cancel';
    public static DELETE_DIALOG_HEADER = 'Delete employee';
    public static DELETE_DIALOG_MESSAGE = 'Are you sure want to delete this employee?';

    public static DATA_ERROR_0 = 'Employee id not found';

    public static APP_NAME = 'EmployeeDetails';
    public static LIST_PAGE_NAME = 'Employee management system';
    public static ADD_EMPLOYEE_PAGE_NAME = 'Add employee';
    public static UPDATE_EMPLOYEE_PAGE_NAME = 'Update employee';
}