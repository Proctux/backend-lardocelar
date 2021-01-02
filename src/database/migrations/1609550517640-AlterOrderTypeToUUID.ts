import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterOrderTypeToUUID1609550517640
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'id');

        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'id');

        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );
    }
}
