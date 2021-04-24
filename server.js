const express = require('express');
const db = require('./db/connection');

const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();


//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Default response
app.use((req, res) => {
    res.status(404).end();
});


//Listen
app.listen(PORT, () => {
    console.log(`Server is Running on Port: ${PORT}`);
});