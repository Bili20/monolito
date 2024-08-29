import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CadastroProdutoDto } from '../dto/cadastroProduto.dto';

@Entity('produto')
export class Produto {
  constructor(props?: CadastroProdutoDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nome: string;

  @Column({ type: 'decimal', nullable: false })
  valor: number;

  @Column({ nullable: false, default: 0 })
  qtd_estoque: number;
}
