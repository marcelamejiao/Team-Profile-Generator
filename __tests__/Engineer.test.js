const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    const engineer = new Engineer('perez', 1, 'perez@gmail.com', 'perezcito');

    it('should return a name', () => {    
        expect(engineer.getName()).toBe('perez');
    });
    it('should return an id', () => {
        expect(engineer.getId()).toBe(1);
    });
    it('should return an email', () => {
        expect(engineer.getEmail()).toBe('perez@gmail.com');
    });
    it('should return a GitHub', () => {
        expect(engineer.getGithub()).toBe('perezcito');
    });
    it('should return Engineer as a role', () => {
        expect(engineer.getRole()).toBe('Engineer');
    });
});