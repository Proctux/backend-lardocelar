import { Router } from 'express';

import ordersRouter from './orders.routes';
import usersRouter from './users.routes';
import roomsRouter from './rooms.routes';
import foodsRouter from './foods.routes';
import sessionsRouter from './sessions.routes';
import employeesRouter from './employees.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/users', usersRouter);
routes.use('/rooms', roomsRouter);
routes.use('/foods', foodsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/employees', employeesRouter);

export default routes;
