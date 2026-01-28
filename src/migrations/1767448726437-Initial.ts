import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1767448726437 implements MigrationInterface {
    name = 'Initial1767448726437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state_archive_mock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "egn" character varying NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "UQ_8f3ff401735127e5bec3be57df9" UNIQUE ("egn"), CONSTRAINT "UQ_32d14c4f18d816d7cbf167365a4" UNIQUE ("email"), CONSTRAINT "PK_f4ed58c7b14c2e231f5b84a29ae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "state_archive_mock"`);
    }

}
