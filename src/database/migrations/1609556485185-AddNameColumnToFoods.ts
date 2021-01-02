import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNameColumnToFoods1609556485185
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'foods',
            new TableColumn({
                name: 'name',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('foods', 'name');
    }
}
