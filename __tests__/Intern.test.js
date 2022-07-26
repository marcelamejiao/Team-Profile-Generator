const Intern = require('../lib/Intern');

describe('Intern', () => {
    const intern = new Intern ('perez', 1, 'perez@gmail.com', 'University of Sydney');

    it('should return a name', () => {    
        expect(intern.getName()).toBe('perez');
    });
    it('should return an id', () => {
        expect(intern.getId()).toBe(1);
    });
    it('should return an email', () => {
        expect(intern.getEmail()).toBe('perez@gmail.com');
    });
    it('should return a School', () => {
        expect(intern.getSchool()).toBe('University of Sydney');
    });
    it('should return Intern as a role', () => {
        expect(intern.getRole()).toBe('Intern');
    });
});