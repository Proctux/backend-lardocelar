import { EntityRepository, Repository, Raw } from 'typeorm';

import Order from '../models/Order';

interface IFindAllInDayDTO {
    day: number;
    month: number;
    year: number;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
    public async findOrdersByDate(date: Date): Promise<Order[] | null> {
        const findOrders = await this.find({ where: { date } });

        return findOrders || null;
    }

    public async findAllInDayAvailability({
        day,
        month,
        year,
    }: IFindAllInDayDTO): Promise<Order[]> {
        const parsedDate = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const orders = await this.find({
            where: {
                date: Raw(
                    dateField =>
                        `to_char(${dateField}, 'DD-MM-YYYY') = '${parsedDate}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['food'],
        });

        console.log(orders);

        return orders;
    }
}

export default OrdersRepository;
