import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('foods')
class Food {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Food;
