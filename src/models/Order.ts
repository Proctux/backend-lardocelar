import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';
import Food from './Food';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    quantity: number;

    @Column('timestamp with time zone')
    date: Date;

    @Column()
    comments: string;

    @Column()
    food_id: string;

    @ManyToOne(() => Food, food => food.id)
    @JoinColumn({ name: 'food_id' })
    food: Food;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
