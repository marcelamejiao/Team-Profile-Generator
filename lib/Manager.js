const Employee = require ('./Employee');

class Manager extends Employee {
    constructor(officeNumber, name, id, email) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.getRole = () => {
            return 'Manager';
        }
    }
}

module.exports = Manager;