const Manager = require('../lib/Manager');

describe('Manager', () => {
    const manager = new Manager('perez', 1, 'perez@gmail.com', 123);
    
    it('should return a name', () => {
        expect(manager.getName()).toBe('perez');
    });
    it('should return an id', () => {
        expect(manager.getId()).toBe(1);
    });
    it('should return an email', () => {
        expect(manager.getEmail()).toBe('perez@gmail.com');
    });
    it('should return a Office Number', () => {
        expect(manager.officeNumber).toBe(123);
    });
    it('should return Manager as a role', () => {
        expect(manager.getRole()).toBe('Manager');
    });
}); 