const router = require('express').Router();
const db = require('../../db/connection');


//Get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM role;`;

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

//add a role
router.post('/role', ({ body }, res) => {
    const error = inputCheck(
        body,
        'title',
        'salary',
        'department_id'
    );
    if (error) {
        return res.status(400).json({ error: error });
    }
    const sql = `INSERT INTO role(title, salary,department_id) 
    VALUES(?,?,?);`;
    const params = [
        body.title,
        body.salary,
        body.department_id
    ];

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