const Employee = require('./Employee');

class Enginner extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.getGithub = () => {
            return this.github
        };
        this.getRole = () => {
            return 'Enginner';
        }
    }
}

module.exports = Enginner;