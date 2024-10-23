import { Pedido } from '../entities/pedido.entity';

export interface IPedidoRepo {
  create(param: Pedido): Promise<Pedido>;
  findOne(id: number): Promise<Pedido>;
  update(id: number, param: Pedido): Promise<void>;
}
