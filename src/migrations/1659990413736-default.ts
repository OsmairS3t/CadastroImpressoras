import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659990413736 implements MigrationInterface {
    name = 'default1659990413736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leituras" ("id" SERIAL NOT NULL, "data" text NOT NULL DEFAULT now(), "leitura" integer NOT NULL, "impressora_id" integer, CONSTRAINT "PK_e373388a038ac75f5840995731b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leituras" ADD CONSTRAINT "FK_9a99d0a7cd34fce53fa8886c912" FOREIGN KEY ("impressora_id") REFERENCES "impressoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leituras" DROP CONSTRAINT "FK_9a99d0a7cd34fce53fa8886c912"`);
        await queryRunner.query(`DROP TABLE "leituras"`);
    }

}
