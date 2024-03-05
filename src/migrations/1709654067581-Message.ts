import { MigrationInterface, QueryRunner } from "typeorm";

export class Message1709654067581 implements MigrationInterface {
    name = 'Message1709654067581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
    }

}
