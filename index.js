const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }

    console.log("Connected as id " + connection.threadId);

    if (connection.connect) {
        getUserInput();
    };

});

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
    ]).then(function (data) {
        //console.log("You successfully chose an add option.")
        //Switch + Functions for  Add departments, roles, employees

        //Reconstruct this:
        switch (data.addChoice) {
            case "Add Departments":
                addDepartment();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employees":
                getEmployeeDetails();
                //addEmployee();
                break;
            case "Quit":
                break;
        }
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
        //Switch statement to determing which data table to Select from and log
    });
};

function updateRoles() {
    console.log("Updating roles...");
    //Function for updating roles
};

function addDepartment() {
    //insert into sql tables
    console.log("Added department!");

};

function addRole() {
    //insert into sql tables

};

function addEmployee(first_name, last_name) {
    //insert into sql tables
    connection.query(`INSERT INTO employee (first_name, last_name) values ("${first_name}", "${last_name}")`);
    console.log("You successfully added an employee.")
};

function getEmployeeDetails() {
    let data = inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        }
    ]).then(function (data) {
        addEmployee(data.first_name, data.last_name);
        console.log(data.first_name, data.last_name);
    });
};





// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles