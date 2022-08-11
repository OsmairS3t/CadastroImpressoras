import { Entity, CreateDateColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Impressora } from './Impressora';

@Entity("leituras")
export class Leitura {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'text'})
    data: string;

    @ManyToOne(() => Impressora, Impressora => Impressora.leituras)
    @JoinColumn({name: 'impressora_id'})
    impressora: Impressora; 
    
    @Column({type: 'integer'})
    leitura: number;
}