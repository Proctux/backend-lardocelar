import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddQuantityColumnToFoods1610146876957
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'foods',
            new TableColumn({
                name: 'quantity',
                type: 'int',
                default: 0,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('foods', 'quantity');
    }
}
