import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CriaEnderecoDTO } from '../dto/criaEndereco.dto';

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

  @Column({ name: 'id_pessoa' })
  id_pessoa: number;

  @OneToOne(() => Pessoa, (pessoa: Pessoa) => pessoa.endereco)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;
}
