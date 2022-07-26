const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
// const Engineer = require('./Engineer');
// const Intern = require('./Intern');

const state = {
    manager: null,
    engineers: [],
    interns: [],
};

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name',
    },
    {
        type: 'input',
        name: 'employeeId',
        message: 'Enter your employee ID',
    },
    {
       type: 'input',
        name: 'email',
        message: 'Enter your email address',
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter the office number',
    },
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name',
    },
    {
        type: 'input',
        name: 'employeeId',
        message: 'Enter your employee ID',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username',
    },
];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name',
    },
    {
        type: 'input',
        name: 'employeeId',
        message: 'Enter your employee ID',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter your school',
    },
];

// Menu questions
const menuQuestion = [
    {
        type: 'list',
        choices: [
            "Add Engineer",
            "Add Intern",
            "Exit"
        ],
        name: 'menu',
        message: 'What would you like to add:',
    },
];
    
// Create a function to write a HTML file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

// Create a function to initialize app
function init() {
    inquirer.prompt(managerQuestions)
        .then(function (managerAnswers) {
            const manager = new Manager(managerAnswers.name, managerAnswers.employeeId, managerAnswers.email, managerAnswers.officeNumber);
            state.manager = manager;

            showMenu();
        });
}

function showMenu() {
    inquirer.prompt(menuQuestion)
    .then(function(menuAnswer){
        if(menuAnswer.menu === 'Add Engineer'){
            // then ask engineer questions
            inquirer.prompt(engineerQuestions)
            .then(function(engineerAnswers){
                const engineer = new Engineer(engineerAnswers.name, engineerAnswers.employeeId, engineerAnswers.email, engineerAnswers.github);
                
                state.engineers.push(engineer);

                showMenu();
            })
        } else if (menuAnswer.menu === 'Add Intern') {
            //then ask intern questions
            inquirer.prompt(internQuestions)
            .then(function(internAnswers){
                const intern = new Intern (internAnswers.name, internAnswers.employeeId, internAnswers.email, internAnswers.school);
                
                state.interns.push(intern);
                showMenu();

            })
        } else {
            //exit - generate HTML
            generateHTML();
        }
    });
}

function generateHTML() {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>My Team</title>
    </head>
    <body>
        <header>
            <div class="jumbotron">
                <h1 class="display-4">My Team</h1>
            </div>
        </header>
        
        <div class="container">
            <h1 class="display-4"> ${state.manager.getName()} Manager</h1>
            <ul class="list-questions">
                <li class="list-questions-item">ID: ${state.manager.getId()}</li>
                <li class="list-questions-item">Email: ${state.manager.getEmail()}</li>
                <li class="list-questions-item">Office number: ${state.manager.officeNumber}</li>
            </ul>
        </div>`;

        for (const engineer of state.engineers) {
            html += `<div class="container">
            <h1 class="display-4"> ${engineer.getName()} Engineer</h1>
            <ul class="list-questions">
                <li class="list-questions-item">ID: ${engineer.getId()}</li>
                <li class="list-questions-item">Email: ${engineer.getEmail()}</li>
                <li class="list-questions-item">GitHub: <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></li>
            </ul>
            </div>`;
        }

        for (const intern of state.interns) {
            html += `<div class="container">
            <h1 class="display-4"> ${intern.getName()} Intern</h1>
            <ul class="list-questions">
                <li class="list-questions-item">ID: ${intern.getId()}</li>
                <li class="list-questions-item">Email: ${intern.getEmail()}</li>
                <li class="list-questions-item">School: ${intern.getSchool()}</li>
            </ul>
            </div>`;
        }

        html += `
    </body>
    </html>`;

    writeToFile('team.html', html);
};

// Function call to initialize app
init();