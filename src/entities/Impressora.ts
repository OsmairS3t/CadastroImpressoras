import { Entity, Column, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Departamento } from './Departamento';
import { Leitura } from './Leitura';

@Entity("impressoras")
export class Impressora {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Departamento, (departamento) => departamento.impressoras)
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamento;

    @OneToMany(() => Leitura, (leitura) => leitura.impressora)
    leituras: Leitura[]

    @Column({ type: 'text' })
    impressora: string;

    @Column({ type: 'text' })
    modelo: string;

    @Column({ type: 'text' })
    ip: string;
}