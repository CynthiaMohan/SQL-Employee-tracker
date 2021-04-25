const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//Get all Employees
router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee;`

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

//Get an Employee of specific id
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?;`;
    const params = req.params.id;
    db.query(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });

        }
        // else if (!row.changedRows) {
        //     res.json({ message: `Employee not found.` });
        //     return;
        // }
        res.json({
            message: 'Success',
            data: row
        });
    });
});

//Delete an employee
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?;`
    const params = req.params.id;
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        else if (!result.affectedRows) {
            res.json({ message: `Employee not found.` });
            return;
        }
        res.json({
            message: `Employee with id: ${params} has been Deleted`,
            changes: result.affectedRows,
            id: req.params.id
        });
    });
});

//add an employee
router.post('/employee', ({ body }, res) => {
    const error = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id',
        'manager_id'
    );
    if (error) {
        return res.status(400).json({ error: error });
    }
    const sql = `INSERT INTO employee(first_name,last_name,role_id,manager_id)
    VALUES(?,?,?,?);`;
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
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

//update an employee
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
        return res.status(400).json({ error: errors });
    }


    const sql = `UPDATE employee SET role_id=? WHERE id=?;`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        else if (!result.affectedRows) {
            return res.status(404).json({ message: 'Employee Not Found' });
        } else {
            res.json({
                message: 'Update Successful',
                data: req.body,
                changes: result.affectedRows
            });
        }

    });
});

module.exports = router;