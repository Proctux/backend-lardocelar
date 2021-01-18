import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageColumnToRooms1611001056590
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'rooms',
            new TableColumn({
                name: 'image',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('rooms', 'image');
    }
}
