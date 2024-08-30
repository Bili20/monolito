import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from 'src/produto/models/entities/produto.entity';

@Entity('pedido_produto')
export class PedidoProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_produto: number;

  @Column({ nullable: false })
  id_pedido: number;

  @Column({ nullable: false })
  quantidade: number;

  @ManyToOne(() => Pedido, (pedido: Pedido) => pedido.pedidoProduto)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Produto, (produto: Produto) => produto.pedidoProduto)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
