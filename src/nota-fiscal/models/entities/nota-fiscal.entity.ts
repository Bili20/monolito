import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: false })
  id_pedido: number;
}
