import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CriaEnderecoDTO } from '../dto/criaEndereco.dto';
import { Pessoa } from './pessoa.entity';

@Entity('endereco')
export class Endereco {
  constructor(props?: CriaEnderecoDTO) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  numero: number;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false, default: false })
  principal: boolean;

  @Column({ name: 'id_pessoa' })
  id_pessoa: number;

  @ManyToOne(() => Pessoa, (pessoa: Pessoa) => pessoa.endereco)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;
}
