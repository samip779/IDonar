import { MigrationInterface, QueryRunner } from "typeorm";

export class DoublePrecision1709220398730 implements MigrationInterface {
    name = 'DoublePrecision1709220398730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "latitude" double precision`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "longitude" double precision`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "latitude" double precision`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "longitude" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "longitude" bigint`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "latitude" bigint`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "longitude" bigint`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "latitude" bigint`);
    }

}
