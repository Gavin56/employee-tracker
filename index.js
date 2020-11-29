const inquirer = require("inquirer");
const mysql = require("mysql");

//MySQL Credentials =========================================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});
//===========================================================

//MySQL Connection ==========================================
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
//===========================================================

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
                //getDepartmentDetails();
                addDepartment();
                break;
            case "Add Roles":
                //getRoleDetails();
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
    // console.log("Updating roles...");
    //Function for updating roles
    connection.query("SELECT * FROM employee;", function (err, results) {
        inquirer.prompt([
            {
                name: "chosenEmployee",
                message: "Which employee's role would you like to update?",
                type: "list",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(`${results[i].first_name} ${results[i].last_name}`)
                    } return choiceArray;
                }
            },
            {
                name: "chosenRole",
                message: "Enter the new role ID for the selected employee:",
                type: "input"
            }
        ]).then(function (answer) {
            var chosenEmployee;

            for (var i = 0; i < results.length; i++) {
                if (`${results[i].first_name} ${results[i].last_name}` === answer.chosenEmployee) {
                    chosenEmployee = results[i];
                }
            }
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.chosenRole
                    },
                    {
                        id: chosenEmployee.id
                    }
                ]
            );

            connection.end();
        })
    });
};

function addDepartment() {
    //insert into sql tables
    console.log("Added department!");
    // Game Design 
    // Animation 
    // Sound
};

function getRoleDetails() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title for this role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        }
    ]).then(function (answer) {
        let title = answer.title;
        title = title.charAt(0).toUpperCase() + title.slice(1);

        connection.query(`INSERT INTO role (title, salary) values ("${title}", "${salary}")`)
        console.log(`Added role: ${title} with salary: ${salary}`);
    });
}

//insert into sql tables
// Game Design - Story Designer, Level Designer
// Animation - Texture Artist, 3D Animator
// Sound - Sound Engineer, Composer

//IMPORTANT!!!
// connection.query("SELECT * FROM role;", function (err, results) {
//     inquirer.prompt([

//     ])
// }

function getEmployeeDetails() {
    inquirer.prompt([
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

    ]).then(function (answer) {
        let first_name = answer.first_name;
        first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);

        let last_name = answer.last_name;
        last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

        connection.query(`INSERT INTO employee (first_name, last_name) values ("${first_name}", "${last_name}")`);
        console.log(`You successfully added: ${first_name} ${last_name}`);
    });
};

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles