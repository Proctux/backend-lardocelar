import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Response {
    user: User;
    token: string;
}

interface Request {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        const matchedPassword = await compare(password, user.password);

        if (!matchedPassword) {
            throw new Error('Incorrect email/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
