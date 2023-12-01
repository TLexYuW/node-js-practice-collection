import express from 'express';
import { getAllEmployees, addOrEditEmployee, updateEmployee } from '../services/employee-service';

export const employeeRoutes = express.Router();

employeeRoutes.post('/', async (req, res) => {
        await addOrEditEmployee(req.body, 0).catch(err => res.status(400).json(err.message));
        res.status(201).send('Created Successfully');
})


employeeRoutes.get('/', async (req, res) => {
        const employees = await getAllEmployees().catch(err => res.status(400).json(err.message));
        res.status(200).json(employees);
})

employeeRoutes.put('/:id', async (req, res) => {
        const data = await updateEmployee(req.body, req.params.id)
        .catch(err => res.status(400).json(err.message)) as number;
        if (data == 0) {
                res.status(404).json('no record with given id : ' + req.params.id);
        } else {
                res.status(200).json("Updated Successfully : " + data);
        }
})

