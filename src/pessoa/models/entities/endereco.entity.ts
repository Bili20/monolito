import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  numero: number;

  @Column({ type: 'char', nullable: false })
  estado: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  cep: string;

  @OneToOne(() => Pessoa, (pessoa: Pessoa) => pessoa.endereco)
  pessoa: Pessoa;
}
