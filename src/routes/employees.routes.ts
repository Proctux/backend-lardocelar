import { Router } from 'express';

import CreateEmployeeService from '../services/CreateEmployeeService';

const employeesRouter = Router();

employeesRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, position } = request.body;

        const createEmployee = new CreateEmployeeService();

        const employee = await createEmployee.execute({
            name,
            email,
            password,
            position,
        });

        return response.json(employee);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default employeesRouter;
