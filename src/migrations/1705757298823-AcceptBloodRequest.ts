import { MigrationInterface, QueryRunner } from 'typeorm';

export class AcceptBloodRequest1705757298823 implements MigrationInterface {
  name = 'AcceptBloodRequest1705757298823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."accepted_blood_requests_patient_gender_enum" AS ENUM('M', 'F')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accepted_blood_requests_blood_group_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accepted_blood_requests_status_enum" AS ENUM('submitted_by_donor', 'cancelled_by_donor', 'invited_by_requester', 'rejected_by_requester', 'donated_by_other_donor', 'request_cancelled', 'donated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "accepted_blood_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "donor_fullname" character varying NOT NULL, "patient_gender" "public"."accepted_blood_requests_patient_gender_enum" NOT NULL, "patient_age" integer NOT NULL, "donor_height" integer NOT NULL, "donor_weight" integer NOT NULL, "donor_address" character varying NOT NULL, "donor-diseases" character varying, "blood_group" "public"."accepted_blood_requests_blood_group_enum" NOT NULL, "donor_contact_number" character varying NOT NULL, "status" "public"."accepted_blood_requests_status_enum" NOT NULL DEFAULT 'submitted_by_donor', "is_donor_user" boolean NOT NULL, "requester_id" uuid NOT NULL, "accepted_account_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3d10e552956196c503139dd2b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."blood_requests_status_enum" AS ENUM('pending', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "blood_requests" ADD "status" "public"."blood_requests_status_enum" NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "accepted_blood_requests" ADD CONSTRAINT "FK_04bd0ec5462c1d6f6d7faa96b40" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accepted_blood_requests" ADD CONSTRAINT "FK_1b53cd324efe8cf359a8c77c198" FOREIGN KEY ("accepted_account_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accepted_blood_requests" DROP CONSTRAINT "FK_1b53cd324efe8cf359a8c77c198"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accepted_blood_requests" DROP CONSTRAINT "FK_04bd0ec5462c1d6f6d7faa96b40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blood_requests" DROP COLUMN "status"`,
    );
    await queryRunner.query(`DROP TYPE "public"."blood_requests_status_enum"`);
    await queryRunner.query(`DROP TABLE "accepted_blood_requests"`);
    await queryRunner.query(
      `DROP TYPE "public"."accepted_blood_requests_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."accepted_blood_requests_blood_group_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."accepted_blood_requests_patient_gender_enum"`,
    );
  }
}
