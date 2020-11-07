const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newEmployee = async() => {
    const checkEngineer = (answers) => {
        return answers.role === 'Engineer'
    };
    const checkManager = (answers) => {
        return answers.role === 'Manager'
    }
    const checkIntern = (answers) => {
        return answers.role === 'Intern'
    }

    console.log('Please, build your team!')
    const Employees = []
    let goOn = true;
    while (goOn) {
        await inquirer.prompt([
            {
                type: 'list',
                message: 'Which type of team member would you like to add?',
                name: 'role',
                choices: [
                    'Engineer',
                    'Intern',
                    'Manager'
                ]
            },
            {
                type: 'input',
                message: `What is your Engineer's name?`,
                name: 'name',
                when: checkEngineer
            },
            {
                type: 'input',
                message: `What is your Engineer's email?`,
                name: 'email',
                when: checkEngineer
            },
            {
                type: 'input',
                message: `What is your Engineer's id?`,
                name: 'id',
                when: checkEngineer
            },
            {
                type: 'input',
                message: `What is your Engineer's github username?`,
                name: 'github',
                when: checkEngineer
            },
            {
                type: 'input',
                message: `What is your Manager's name?`,
                name: 'name',
                when: checkManager
            },
            {
                type: 'input',
                message: `What is your Manager's email?`,
                name: 'email',
                when: checkManager
            },
            {
                type: 'input',
                message: `What is your Manager's id?`,
                name: 'id',
                when: checkManager
            },
            {
                type: 'input',
                message: `What is your Manager's office number?`,
                name: 'officeNumber',
                when: checkManager
            },
            {
                type: 'input',
                message: `What is your Intern's name?`,
                name: 'name',
                when: checkIntern
            },
            {
                type: 'input',
                message: `What is your Intern's email?`,
                name: 'email',
                when: checkIntern
            },
            {
                type: 'input',
                message: `What is your Intern's id?`,
                name: 'id',
                when: checkIntern
            },
            {
                type: 'input',
                message: `What is your Intern's school?`,
                name: 'school',
                when: checkIntern
            },
            {
                type: 'confirm',
                message: `Would you like to create a new Employee?`,
                name: 'continue'
            }
        ]).then(answers => {
            switch (answers.role) {
                case 'Engineer':
                    Employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
                    break;
                case 'Manager':
                    Employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber))
                    break;
                case 'Intern':
                    Employees.push(new Intern(answers.name, answers.id, answers.email, answers.school))
                    break;
            }

            if (answers.continue === false) {
                goOn = false;
            }
        })
    }
    // CREATE FILE HERE
    // fs.writeFile(fileName, data)
}
newEmployee();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!