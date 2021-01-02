import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    room_number: number;

    @Column('boolean')
    busy: boolean;

    @Column('boolean')
    vip: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Room;
