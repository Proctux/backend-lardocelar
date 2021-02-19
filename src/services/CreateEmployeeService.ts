import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import Employee from '../models/Employee';

interface Request {
    name: string;
    email: string;
    password: string;
    position: string;
}

class CreateEmployeeService {
    public async execute({
        name,
        email,
        password,
        position,
    }: Request): Promise<Employee> {
        const employeesRepository = getRepository(Employee);

        const checkEmployeeExists = await employeesRepository.findOne({
            where: { email },
        });

        if (checkEmployeeExists) {
            throw new Error('This email is already in use');
        }

        const hashPassword = await hash(password, 8);

        const employee = employeesRepository.create({
            name,
            email,
            password: hashPassword,
            position,
        });

        await employeesRepository.save(employee);

        return employee;
    }
}

export default CreateEmployeeService;
