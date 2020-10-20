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

// Define a function that will write the resulting html after being passed into render function, and write it to html file. Pass the function into init.
const write = (result) => {
  fs.writeFile(outputPath, result, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Employees successfully written to HTML.");
  });
};

// Define a function to validate that ID input is a number.
let validateNumbers = (moreValidationChecks) => ({
  validate: (input) => {
    if (input === "") {
      return "ID needs to be a number.";
    }
    return moreValidationChecks ? moreValidationChecks(input) : true;
  },
  filter: (input) => {
    // clear the invalid input
    return Number.isNaN(input) || Number(input) < 0 ? "" : Number(input);
  },
});

// Define a function to validate that manager's office number input is a number.
let validatePhone = (moreValidationChecks) => ({
  validate: (input) => {
    if (input === "") {
      return "Office phone should only include numbers. Do not use any special characters.";
    }
    return moreValidationChecks ? moreValidationChecks(input) : true;
  },
  filter: (input) => {
    // clear the invalid input
    return Number.isNaN(input) || Number(input) < 0 ? "" : Number(input);
  },
});

// Define a function to validate name is not an empty string.
const validateName = (input) => {
  if (input === "") {
    return "Name is required.";
  } else {
    return true;
  }
};

// Define a list of questions to ask if the employee is a manager.
const managerQuestions = [
  {
    type: "input",
    message: "What is the manager's name?",
    name: "managerName",
    validate: validateName,
  },
  {
    type: "number",
    message: "What is the manager's ID number?",
    name: "managerId",
    ...validateNumbers(),
  },
  {
    type: "input",
    message: "What is the manager's email address?",
    name: "managerEmail",
  },
  {
    type: "number",
    message: "What is the manager's office phone number?",
    name: "managerOffice",
    ...validatePhone(),
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
    validate: validateName,
  },
  {
    type: "number",
    message: "What is the engineer's ID number?",
    name: "engineerId",
    ...validateNumbers(),
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
    validate: validateName,
  },
  {
    type: "number",
    message: "What is the intern's ID number?",
    name: "internId",
    ...validateNumbers(),
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

//Define a boolean that will prevent the user from adding more than one manager.
let managerExists = false;

// Define a function that initializes the data collection.
// Change which questions are asked based on the employee's role.
// Callback1 will take resulting array of employee objects and pass it into render function. The resulting html template will be saved to a variable.
// Callback2 will take the resulting html template and save it to html file to be displayed on screen.
let init = (cb1, cb2) => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((response) => {
      switch (response.employeeRole) {
        case "Manager":
          // If a manager does not yet exist, proceed with the code block.
          if (managerExists === false) {
            inquirer.prompt(managerQuestions).then((response) => {
              const manager = new Manager(
                response.managerName,
                response.managerId,
                response.managerEmail,
                response.managerOffice
              );
              employees.push(manager);
              // After one manager has been added, change the boolean value.
              // Creation of another manager will be prevented by the if statement this code block is in.
              managerExists = true;
              // If the user chooses to add another employee, call the function again.
              // Else, pass the resulting employees array into the render function, and write the resulting data to an html file.
              if (response.repeatInquirer) {
                init(cb1, cb2);
              } else {
                console.log(employees);
                let result = cb1(employees);
                cb2(result);
              }
            });
          }
          // If a manager already exists, notify the user and reset the question.
          else {
            console.log("Only one manager can exist per team.");
            init(cb1, cb2);
          }
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
              init(cb1, cb2);
            } else {
              console.log(employees);
              let result = cb1(employees);
              cb2(result);
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
              init(cb1, cb2);
            } else {
              console.log(employees);
              let result = cb1(employees);
              cb2(result);
            }
          });
          break;
      }
    });
};

// Initialize the data collection process. Pass in the render and write functions.
init(render, write);
