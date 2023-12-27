import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoodRequest1703660878547 implements MigrationInterface {
  name = 'BoodRequest-1703660878547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."blood_requests_patient_gender_enum" AS ENUM('M', 'F')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."blood_requests_blood_group_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blood_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patient_gender" "public"."blood_requests_patient_gender_enum" NOT NULL, "patient_age" integer NOT NULL, "blood_group" "public"."blood_requests_blood_group_enum" NOT NULL, "donation_date" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8abbf692f9b2a595b8ba9762b81" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blood_requests"`);
    await queryRunner.query(
      `DROP TYPE "public"."blood_requests_blood_group_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."blood_requests_patient_gender_enum"`,
    );
  }
}
