import { MigrationInterface, QueryRunner } from "typeorm";

export class BloodRequests1704621552306 implements MigrationInterface {
    name = 'BloodRequests1704621552306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "contact_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "contact_number"`);
    }

}
