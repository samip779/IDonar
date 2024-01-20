import { MigrationInterface, QueryRunner } from "typeorm";

export class AcceptBloodRequest1705759062036 implements MigrationInterface {
    name = 'AcceptBloodRequest1705759062036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "blood_request_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "blood_requet_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD CONSTRAINT "FK_4fdb3ec3ddc9ff7eed7f975e0b6" FOREIGN KEY ("blood_requet_id") REFERENCES "blood_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP CONSTRAINT "FK_4fdb3ec3ddc9ff7eed7f975e0b6"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "blood_requet_id"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "blood_request_id"`);
    }

}
