import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Order from '../models/Order';
import OrdersRepository from '../repositories/OrdersRepository';
import RemoveFoodQuantityService from './RemoveFoodQuantityService';

interface Request {
    quantity: number;
    date: Date;
    comments: string;
    food_id: string;
    user_id: string;
}

class CreateOrderService {
    public async execute({
        quantity,
        date,
        comments,
        food_id,
        user_id,
    }: Request): Promise<Order> {
        const orderDate = startOfHour(date);

        const ordersRepository = getCustomRepository(OrdersRepository);

        const findOrders = await ordersRepository.findOrdersByDate(orderDate);

        if (findOrders && findOrders.length >= 5) {
            throw new Error('No more orders are available for this time');
        }

        const order = await ordersRepository.create({
            quantity,
            date: orderDate,
            comments,
            food_id,
            user_id,
        });

        const removeFoodQuantity = new RemoveFoodQuantityService();

        await removeFoodQuantity.execute({ food_id, quantity });

        await ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
