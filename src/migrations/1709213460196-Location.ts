import { MigrationInterface, QueryRunner } from "typeorm";

export class Location1709213460196 implements MigrationInterface {
    name = 'Location1709213460196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "latitude" bigint`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "longitude" bigint`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "latitude" bigint`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "longitude" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "latitude"`);
    }

}
