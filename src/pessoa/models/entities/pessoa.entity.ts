import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CriaPessoaDto } from '../dto/criaPessoa.dto';
import { Endereco } from './endereco.entity';
import { Pedido } from 'src/pedido/models/entities/pedido.entity';

@Entity('pessoa')
export class Pessoa {
  constructor(props?: CriaPessoaDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'documento', nullable: false, unique: true })
  documento: string;

  @Column({ name: 'data_nacimento', nullable: false })
  data_nacimento: Date;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'telefone', nullable: false })
  telefone: string;

  @Column({ name: 'sexo', nullable: false })
  sexo: string;

  @OneToMany(() => Endereco, (endereco: Endereco) => endereco.pessoa)
  endereco: Endereco;

  @OneToMany(() => Pedido, (pedido: Pedido) => pedido.pessoa)
  pedido: Pedido;
}
