import { NotaFiscal } from 'src/nota-fiscal/models/entities/nota-fiscal.entity';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CriaPedidoDto } from '../dto/criaPedido.dto';
import { PedidoProduto } from './pedidoProduto.entity';

@Entity('pedido')
export class Pedido {
  constructor(props?: CriaPedidoDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantidade: number;

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_cadastro: Date;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ nullable: false })
  id_pessoa: number;

  @ManyToOne(() => Pessoa, (pessoa: Pessoa) => pessoa.pedido)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa[];

  @OneToOne(() => NotaFiscal, (notaFiscal: NotaFiscal) => notaFiscal.pedido)
  notaFiscal: NotaFiscal;

  @OneToMany(
    () => PedidoProduto,
    (pedidoProduto: PedidoProduto) => pedidoProduto.pedido,
  )
  pedidoProduto: PedidoProduto;
}