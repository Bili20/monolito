import { PedidoProduto } from '../entities/pedidoProduto.entity';

export interface IPedidoProdutoRepo {
  create(param: PedidoProduto): Promise<void>;
}
