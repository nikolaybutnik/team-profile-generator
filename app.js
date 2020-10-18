const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Define an array that holds all employee objects.
let employees = [];

// Define a list of questions to ask if the employee is a manager.
const managerQuestions = [
  {
    type: "input",
    message: "What is the manager's name?",
    name: "managerName",
  },
  {
    type: "input",
    message: "What is the manager's ID number?",
    name: "managerId",
  },
  {
    type: "input",
    message: "What is the manager's email address?",
    name: "managerEmail",
  },
  {
    type: "input",
    message: "What is the manager's office phone number?",
    name: "managerOffice",
  },
  {
    type: "confirm",
    message: "Add another employee?",
    name: "repeatInquirer",
    default: false,
  },
];

// Define a list of questions to ask if the employee is an engineer.
const engineerQuestions = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "engineerName",
  },
  {
    type: "input",
    message: "What is the engineer's ID number?",
    name: "engineerId",
  },
  {
    type: "input",
    message: "What is the engineer's email address?",
    name: "engineerEmail",
  },
  {
    type: "input",
    message: "What is the engineer's GitHub username?",
    name: "engineerGithub",
  },
  {
    type: "confirm",
    message: "Add another employee?",
    name: "repeatInquirer",
    default: false,
  },
];

// Define a list of questions to ask if the employee is an intern.
const internQuestions = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "internName",
  },
  {
    type: "input",
    message: "What is the intern's ID number?",
    name: "internId",
  },
  {
    type: "input",
    message: "What is the intern's email address?",
    name: "internEmail",
  },
  {
    type: "input",
    message: "Which school did the intern go to?",
    name: "internSchool",
  },
  {
    type: "confirm",
    message: "Add another employee?",
    name: "repeatInquirer",
    default: false,
  },
];

// Define a function that initializes the data collection.
// Change which questions are asked based on the employee's role.
let init = (cb1, cb2) => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: ["Manager", "Engineer", "Intern"],
        // Validate that only one manager exists per team.
      },
    ])
    .then((response) => {
      switch (response.employeeRole) {
        case "Manager":
          inquirer.prompt(managerQuestions).then((response) => {
            const manager = new Manager(
              response.managerName,
              response.managerId,
              response.managerEmail,
              response.managerOffice
            );
            employees.push(manager);
            if (response.repeatInquirer) {
              init(cb1);
            } else {
              console.log(employees);
              let result = cb1(employees);
            }
          });
          break;
        case "Engineer":
          inquirer.prompt(engineerQuestions).then((response) => {
            const engineer = new Engineer(
              response.engineerName,
              response.engineerId,
              response.engineerEmail,
              response.engineerGithub
            );
            employees.push(engineer);
            if (response.repeatInquirer) {
              init(cb1);
            } else {
              console.log(employees);
              let result = cb1(employees);
            }
          });
          break;
        case "Intern":
          inquirer.prompt(internQuestions).then((response) => {
            const intern = new Intern(
              response.internName,
              response.internId,
              response.internEmail,
              response.internSchool
            );
            employees.push(intern);
            if (response.repeatInquirer) {
              init(cb1);
            } else {
              console.log(employees);
              let result = cb1(employees);
            }
          });
          break;
      }
    });
};

// Initialize the data collection process.
init(render);

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
// for the provided `render` function to work! ```
