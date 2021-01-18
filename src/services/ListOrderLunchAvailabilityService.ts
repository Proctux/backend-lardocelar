import { getCustomRepository } from 'typeorm';
import { getHours, isAfter } from 'date-fns';

import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
    day: number;
    month: number;
    year: number;
}

interface Response {
    hour: number;
    available: boolean;
}

class ListOrderLunchAvailabilityService {
    public async execute({ day, month, year }: Request): Promise<Response[]> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const orders = await ordersRepository.findAllInDayAvailability({
            day,
            month,
            year,
        });

        const initialHour = 11;

        const eachHourArray = Array.from(
            { length: 4 },
            (_, index) => index + initialHour,
        );

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasOrderInHour = orders.filter(
                order => getHours(order.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    hasOrderInHour.length < 5 &&
                    isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListOrderLunchAvailabilityService;
