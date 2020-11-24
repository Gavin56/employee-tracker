const inquirer = require("inquirer");
const mysql = require("mysql");

function getUserInput() {
    try {
        let data = inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["Add", "View", "Update", "Quit" ],
                name: "processChoice"
            }
        ]);
        return data;
    } catch(error) {
        console.log(error);
    }
};

getUserInput();

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles