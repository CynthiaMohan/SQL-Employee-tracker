const router = require('express').Router();
const inputCheck = require('../../utils/inputCheck')
const db = require('../../db/connection');

//Get all departments
router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: message.err });
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

//add a department
router.post('/department', ({ body }, res) => {
    const error = inputCheck(
        body,
        'name'
    );
    if (error) {
        return res.status(400).json({ error: error });
    }
    const sql = `INSERT INTO department(name)VALUES(?);`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(400).json({ err: err.message });
        }
        res.json({
            message: 'Successfully Inserted row',
            data: body
        });
    });
});

module.exports = router;