import { EntityRepository, Repository } from 'typeorm';

import Order from '../models/Order';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
    public async findOrders(date: Date): Promise<Order[] | null> {
        const findOrders = await this.find({ where: { date } });

        return findOrders || null;
    }
}

export default OrdersRepository;
