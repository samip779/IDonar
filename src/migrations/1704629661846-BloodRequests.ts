import { MigrationInterface, QueryRunner } from "typeorm";

export class BloodRequests1704629661846 implements MigrationInterface {
    name = 'BloodRequests1704629661846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "requester_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "blood_requests" ADD CONSTRAINT "FK_4d56a25d2262382cbcddab1e57e" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP CONSTRAINT "FK_4d56a25d2262382cbcddab1e57e"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "blood_requests" DROP COLUMN "requester_id"`);
    }

}
