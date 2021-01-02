import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCommentColumnToOrders1609556999794
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'comments',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'comments');
    }
}
