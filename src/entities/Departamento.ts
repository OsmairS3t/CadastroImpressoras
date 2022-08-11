import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Impressora } from "./Impressora";

@Entity('departamentos')
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    departamento: string;

    @OneToMany(() => Impressora, (impressora) => impressora.departamento)
    impressoras: Impressora[]
}