import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterRoomToRoomIdUser1609552605201
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'room');

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'room_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'UsersRoom',
                columnNames: ['room_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'rooms',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'UsersRoom');

        await queryRunner.dropColumn('users', 'room_id');

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'room',
                type: 'int',
            }),
        );
    }
}
