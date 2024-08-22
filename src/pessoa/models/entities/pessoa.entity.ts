import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'documento', nullable: false })
  documento: string;

  @Column({ name: 'data_nacimento', nullable: false })
  data_nacimento: Date;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'telefone', nullable: false })
  telefone: number;

  @Column({ name: 'sexo', nullable: false })
  sexo: string;

  @Column({ name: 'id_endereco', nullable: false, unique: true })
  id_endereco: number;

  @OneToOne(() => Endereco, (endereco: Endereco) => endereco.pessoa)
  @JoinColumn({ name: 'id_endereco' })
  endereco: Endereco;
}
