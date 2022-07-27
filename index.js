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
        message: "Enter Engineer's name",
    },
    {
        type: 'input',
        name: 'employeeId',
        message: "Enter Engineer's ID",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Engineer's email address",
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter Engineer's GitHub username",
    },
];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter Intern's name",
    },
    {
        type: 'input',
        name: 'employeeId',
        message: "Enter Intern's ID",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Intern's email address",
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter Intern's school",
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
        <header class="bg-primary text-light text-center">
        <h1>My Team</h1>
        </header>

        <main>
            <div class="row p-4">
                

                <div class="card text-white bg-dark border-primary m-6 p-4 col-md-3" >
                    <div class="card-body">
                        <h5 class="card-header bg-primary"> ${state.manager.getName()} Manager</h5>
                        <ul class="list-questions">
                            <li class="list-questions-item">ID: ${state.manager.getId()}</li>
                            <li class="list-questions-item">Email: <a href="mailto:${state.manager.getEmail()}"> ${state.manager.getEmail()}</a></li>
                            <li class="list-questions-item">Office number: ${state.manager.officeNumber}</li>
                        </ul>
                    </div>
                </div>`;

                for (const engineer of state.engineers) {
                    html += 
                    `<div class="card text-white bg-dark border-primary m-6 p-4 col-md-3">
                        <div class="card-body">
                            <h5 class="card-header bg-primary"> ${engineer.getName()} Engineer</h5>
                            <ul class="list-questions">
                                <li class="list-questions-item">ID: ${engineer.getId()}</li>
                                <li class="list-questions-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                                <li class="list-questions-item alert alert-primary" style="list-style-type: none;">GitHub: <a target="_blank" href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></li>
                            </ul>
                        </div>
                    </div>`;   
                }

                for (const intern of state.interns) {
                    html += 
                    `<div class="card text-white bg-dark border-primary m-6 p-4 col-md-3">
                        <div class="card-body">
                            <h5 class="card-header bg-primary"> ${intern.getName()} Intern</h5>
                            <ul class="list-questions">
                                <li class="list-questions-item">ID: ${intern.getId()}</li>
                                <li class="list-questions-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                                <li class="list-questions-item">School: ${intern.getSchool()}</li>
                            </ul>
                        </div>    
                    </div>`;
                }

                html += `
            </div>
        </main>
    </body>
    </html>`;

    writeToFile('./dist/index.html', html);
};

// Function call to initialize app
init();