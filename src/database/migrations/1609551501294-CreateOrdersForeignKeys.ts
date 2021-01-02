import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateOrdersForeignKeys1609551501294
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersFood',
                columnNames: ['food_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'foods',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersUser');
        await queryRunner.dropForeignKey('orders', 'OrdersFood');
    }
}
