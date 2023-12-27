import { MigrationInterface, QueryRunner } from 'typeorm';

export class Otp1702112150235 implements MigrationInterface {
  name = 'Otp1702112150235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."otp_type_enum" AS ENUM('email_verification', 'password_reset')`,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("user_id" uuid NOT NULL, "code" character varying(6) NOT NULL, "type" "public"."otp_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_258d028d322ea3b856bf9f12f25" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"`,
    );
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(`DROP TYPE "public"."otp_type_enum"`);
  }
}
