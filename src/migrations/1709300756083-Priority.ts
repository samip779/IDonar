import { MigrationInterface, QueryRunner } from "typeorm";

export class Priority1709300756083 implements MigrationInterface {
    name = 'Priority1709300756083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" RENAME COLUMN "donation_date" TO "priority"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "priority" smallint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "priority" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blood_requests" RENAME COLUMN "priority" TO "donation_date"`);
    }

}
