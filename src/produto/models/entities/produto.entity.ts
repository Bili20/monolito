import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CadastroProdutoDto } from '../dto/cadastroProduto.dto';
import { PedidoProduto } from 'src/pedido/models/entities/pedidoProduto.entity';

@Entity('produto')
export class Produto {
  constructor(props?: CadastroProdutoDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ type: 'decimal', nullable: false })
  valor: number;

  @Column({ nullable: false, default: 0 })
  qtd_estoque: number;

  @OneToMany(
    () => PedidoProduto,
    (pedidoProduto: PedidoProduto) => pedidoProduto.produto,
  )
  pedidoProduto: PedidoProduto;
}
