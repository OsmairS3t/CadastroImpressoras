import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659969644643 implements MigrationInterface {
    name = 'default1659969644643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leituras" ("id" SERIAL NOT NULL, "data" date NOT NULL DEFAULT now(), "leitura" integer NOT NULL, "impressora_id" integer, CONSTRAINT "PK_e373388a038ac75f5840995731b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "impressoras" ("id" integer NOT NULL, "impressora" text NOT NULL, "modelo" text NOT NULL, "ip" text NOT NULL, "departamento_id" integer, CONSTRAINT "PK_fb38412cc8b62113cfff2e6982f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departamentos" ("id" SERIAL NOT NULL, "departamento" text NOT NULL, CONSTRAINT "PK_6d34dc0415358a018818c683c1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leituras" ADD CONSTRAINT "FK_9a99d0a7cd34fce53fa8886c912" FOREIGN KEY ("impressora_id") REFERENCES "impressoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "impressoras" ADD CONSTRAINT "FK_e19134f0d0add197625a744e532" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "impressoras" DROP CONSTRAINT "FK_e19134f0d0add197625a744e532"`);
        await queryRunner.query(`ALTER TABLE "leituras" DROP CONSTRAINT "FK_9a99d0a7cd34fce53fa8886c912"`);
        await queryRunner.query(`DROP TABLE "departamentos"`);
        await queryRunner.query(`DROP TABLE "impressoras"`);
        await queryRunner.query(`DROP TABLE "leituras"`);
    }

}
