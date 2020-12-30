import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Order from '../models/Order';
import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
    quantity: number;
    date: Date;
}

class CreateOrderService {
    public async execute({ quantity, date }: Request): Promise<Order> {
        const orderDate = startOfHour(date);

        const ordersRepository = getCustomRepository(OrdersRepository);

        const findOrders = await ordersRepository.findOrders(orderDate);

        if (findOrders && findOrders.length >= 10) {
            throw new Error('No more orders are available for this time');
        }

        const order = await ordersRepository.create({
            quantity,
            date: orderDate,
        });

        await ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
