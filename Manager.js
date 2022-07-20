const Employee = require ('./Employee');

class Manager extends Employee {
    constructor(officeNumber, name, id, email) {
        this.officeNumber = officeNumber;
        super(name, id, email);
        this.getRole = () => {
            return 'Manager'
        }
    }
}

module.exports = Manager;