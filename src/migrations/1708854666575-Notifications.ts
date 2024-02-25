import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1708854666575 implements MigrationInterface {
    name = 'Notifications1708854666575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP CONSTRAINT "FK_4fdb3ec3ddc9ff7eed7f975e0b6"`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "seen" boolean NOT NULL DEFAULT false, "notifier_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP COLUMN "blood_requet_id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_f82e4241b5c3d360a7a5faf79bb" FOREIGN KEY ("notifier_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD CONSTRAINT "FK_28267326cd654681ad4fc86531b" FOREIGN KEY ("blood_request_id") REFERENCES "blood_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" DROP CONSTRAINT "FK_28267326cd654681ad4fc86531b"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_f82e4241b5c3d360a7a5faf79bb"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD "blood_requet_id" uuid`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`ALTER TABLE "accepted_blood_requests" ADD CONSTRAINT "FK_4fdb3ec3ddc9ff7eed7f975e0b6" FOREIGN KEY ("blood_requet_id") REFERENCES "blood_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
