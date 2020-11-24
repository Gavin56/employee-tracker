const inquirer = require("inquirer");
const mysql = require("mysql");

function getUserInput() {
    try {
        let data = inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["Add", "View", "Update Employee Roles", "Quit"],
                name: "processChoice"
            }
        ]).then(function (data) {
            // console.log(".then works!");

            switch (data.processChoice) {
                case "Add":
                    displayAddMenu();
                    break;
                case "View":
                    displayViewMenu();
                    break;
                case "Update Employee Roles":
                    updateRoles();
                    break;
                case "Quit":
                    break;
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

function displayAddMenu() {
    let data = inquirer.prompt([
        {
            type: "list",
            message: "Select what you would like to add:",
            choices: ["Add Departments", "Add Roles", "Add Employees"],
            name: "addChoice"
        }
    ]).then(function () {
        console.log("You successfully chose an add option.")
    });
};

function displayViewMenu() {
    let data = inquirer.prompt([
        {
            type: "list",
            message: "Select what you would like to view:",
            choices: ["View Departments", "View Roles", "View Employees"],
            name: "viewChoice"
        }
    ]).then(function () {
        console.log("You successfully chose a view option.")
    });
};

function updateRoles() {
    console.log("Updating roles...");
};

getUserInput();

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles