const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();


//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use api Routes
app.use('/api', apiRoutes);

//Default response
app.use((req, res) => {
    res.status(404).end();
});

let startapp = () => {
    inquirer.prompt([
        {
            type: list,
            message: 'Menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'And update an employee role'],
            validate: menuInput => {
                if (!menuInput) {
                    console.log('Please choose an option');
                    return false;
                }
                return true;
            }
        }
    ]);
}

//Connect to database
db.connect(err => {
    if (err) throw err;
    console.log('connected to Database');

    //Listen
    app.listen(PORT, () => {
        console.log(`Server is Running on Port: ${PORT}`);
    });
});