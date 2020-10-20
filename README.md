# Team Profile Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A simple command line application for efficiently generating an HTML file populated with employees that make up a team. A team consists of one manager and any number of engineers and interns.

![Team Profile Generator Image](https://github.com/nikolaybutnik/team-profile-generator/blob/main/team-profile-generator-screenshot.png?raw=true)

## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [License](#License)
4. [Contributing](#Contributing)
5. [Tests](#Tests)
6. [Questions](#Questions)

## Installation

Run `npm install` from the CLI to ensure all dependencies are installed.

## Usage

Run `node app.js` from the CLI and follow onscreen instructions. The application will prompt the user for a series of inputs. The application will begin by asking for the role of employee to be created. The choices are: manager, engineer, and intern. Depending on this input, a tailored series of questions will be presented. Once all the data has been collected, the data is inserted into a pre-written template and written to an HTML file. The file is located in the `/output` folder. Note that upon running the application again, the file will be overwritten.

## License

This project is covered under the MIT license. To find out what is permitted under this license, click the license badge at the top of the README.

## Contributing

Feel free to submit any pull requests. All pull requests will be considered.

## Tests

Navigate to `/lib` folder and run `npm test` from CLI. Ensure to run `npm install` before using the application to make sure Jest and all other dependencies are installed. The tests will be ran on the employee classes used in creation of team members.

## Questions

You may directly send any questions related to this project or any of my other projects to [my email adress](mailto:btnk.nik@gmail.com). To find all my projects visit [my GitHub profile](https://github.com/nikolaybutnik).
