import { Pedido } from 'src/pedido/models/entities/pedido.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('nota_fiscal')
export class NotaFiscal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_cadastro: Date;

  @Column({ nullable: false })
  anexo: string;

  @Column({ nullable: false, unique: true })
  id_pedido: number;

  @OneToOne(() => Pedido, (pedido: Pedido) => pedido.notaFiscal)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
}
