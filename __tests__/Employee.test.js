const Employee = require('../lib/Employee');

describe('Employee', () => {
    const employee = new Employee('perez', 1, 'perez@gmail.com');
    
    it('should return a name', () => {
        expect(employee.getName()).toBe('perez');
    });
    it('should return an id', () => {
        expect(employee.getId()).toBe(1);
    });
    it('should return an email', () => {
        expect(employee.getEmail()).toBe('perez@gmail.com');
    });
    it('should return Employee as a role', () => {
        expect(employee.getRole()).toBe('Employee');
    });
});     