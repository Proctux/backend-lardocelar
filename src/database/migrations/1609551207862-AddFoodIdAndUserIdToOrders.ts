import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFoodIdAndUserIdToOrders1609551207862
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'food_id',
                type: 'uuid',
            }),
        );

        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'user_id');
        await queryRunner.dropColumn('orders', 'food_id');
    }
}
