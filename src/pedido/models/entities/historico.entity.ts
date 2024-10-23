import { StatusEnum } from 'src/enum/status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity({ name: 'historico' })
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_pedido: number;

  @Column({ nullable: false })
  status: StatusEnum;

  @ManyToOne(() => Pedido, (pedido: Pedido) => pedido.historico)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
}
