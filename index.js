const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
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
            "Engineer",
            "Intern",
        ],
        name: 'menu',
        message: 'Would you like to add an:',
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
            const manager = new Manager(managerAnswers.officeNumber, managerAnswers.name, managerAnswers.employeeId, managerAnswers.email);
            state.manager = manager;

            inquirer.prompt(menuQuestion)
                .then(function(menuAnswer){
                    if(menuAnswer.menu === 'Engineer'){
                        // then ask engineer questions
                        console.log('I am going to ask engineer questions')
                    }else {
                        //then ask intern questions
                        console.log('I am going to ask the intern questions')
                    }
                })
        });

    // answer = inquirer.prompt(menuQuestion);
    
    // if (anwser =='engineer') {
    //     inquirer.prompt(engineerQuestions);
    // } else {
    //     inquirer.prompt(internQuestions);
    // };

    // questions()
    // // Use writeFileSync method to use promises instead of a callback function
    // .then((answers) => writeToFile('output/index.html', generateMarkdown(answers)))
    // .then(() => console.log('Successfully wrote to output/index.html'))
    // .catch((err) => console.error(err));
}

function generateMarkdown({answers}) {
    `<!DOCTYPE html>
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
            <h1 class="display-4"> ${Manager.this.name} Manager</h1>
            <ul class="list-questions">
                <li class="list-questions-item">ID: ${Manager.this.id}</li>
                <li class="list-questions-item">Email: ${Manager.this.email}</li>
                <li class="list-questions-item">Office number: ${Manager.this.officeNumber}</li>
            </ul>
        </div>
        <div class="container">
        <h1 class="display-4"> ${Engineer.this.name} Manager</h1>
        <ul class="list-questions">
            <li class="list-questions-item">ID: ${Engineer.this.id}</li>
            <li class="list-questions-item">Email: ${Engineer.this.email}</li>
            <li class="list-questions-item">GitHub: ${Engineer.this.github}</li>
        </ul>
        </div>
        <div class="container">
        <h1 class="display-4"> ${Intern.this.name} Manager</h1>
        <ul class="list-questions">
            <li class="list-questions-item">ID: ${Intern.this.id}</li>
            <li class="list-questions-item">Email: ${Intern.this.email}</li>
            <li class="list-questions-item">Office number: ${Intern.this.school}</li>
        </ul>
        </div>
    </body>
    </html>`;
};

// Function call to initialize app
init();