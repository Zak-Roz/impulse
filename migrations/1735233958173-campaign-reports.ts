import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaignReports1735233958173 implements MigrationInterface {
    name = 'CampaignReports1735233958173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."campaign_reports_event_name_enum" AS ENUM('install', 'purchase')`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "campaign_reports" (
                id SERIAL NOT NULL,
                campaign CHARACTER VARYING(255),
                campaign_id CHARACTER VARYING(50),
                adgroup CHARACTER VARYING(255),
                adgroup_id CHARACTER VARYING(50),
                ad CHARACTER VARYING(255),
                ad_id CHARACTER VARYING(50),
                client_id CHARACTER VARYING(50),
                event_name "public"."campaign_reports_event_name_enum" NOT NULL DEFAULT 'install',
                event_time TIMESTAMP NOT NULL,
                CONSTRAINT "IDX_uniq_event_time_client_id_event_name" UNIQUE ("event_time", "client_id", "event_name"),
                CONSTRAINT "PK_d4f9d11076c9b736d3e1473b32f" PRIMARY KEY ("id")
            );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "campaign_reports"`);
        await queryRunner.query(`DROP TYPE "public"."campaign_reports_event_name_enum"`);
    }

}
