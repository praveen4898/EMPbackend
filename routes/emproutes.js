
const express = require("express");
const { EmployeeModel } = require("../model/employeemodel");
const { auth } = require("../middleware/authmiddleware");
const empRouter = express.Router();





// Create
empRouter.post('/', auth, async (req, res) => {
    try {
        const employee = new EmployeeModel(req.body);
        await employee.save();
        res.status(201).send({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error',error });
    }
});

// Read
// Example route to fetch all employees
// empRouter.get('/', auth, async (req, res) => {
//     try {
//         const employees = await EmployeeModel.find();
//         res.send(employees);
//     } catch (error) {
//         res.status(500).send({ error: 'Internal server error' });
//     }
// });
// server.js (continued)

// Read with Pagination
empRouter.get('/', auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const employees = await EmployeeModel.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

//tofilter
empRouter.get('/filter', auth, async (req, res) => {
    const { department } = req.query;
    try {
        const employees = await EmployeeModel.find({ department });
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});





//tosort
empRouter.get('/sort', auth, async (req, res) => {
    const { sortBy } = req.query;
    try {
        const employees = await EmployeeModel.find().sort({ salary: sortBy });
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});


//tosearch
empRouter.get('/search', auth, async (req, res) => {
    const { firstName } = req.query;
    try {
        const employees = await EmployeeModel.find({ firstName: { $regex: new RegExp(firstName, 'i') } });
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Update
empRouter.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Delete
empRouter.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeModel.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});


module.exports={
    empRouter
}