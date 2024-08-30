import { Inject, Injectable } from '@nestjs/common';
import { CriaPedidoProdutoDTO } from 'src/pedido/models/dto/criaPedidoProduto.dto';
import { PedidoProduto } from 'src/pedido/models/entities/pedidoProduto.entity';
import { IPedidoProdutoRepo } from 'src/pedido/models/interfaces/pedidoProduto.interface';

@Injectable()
export class CriaPedidoProdutoUseCase {
  @Inject('IPedidoProdutoRepo')
  private readonly pedidoProdutoRepo: IPedidoProdutoRepo;

  async execute(param: CriaPedidoProdutoDTO) {
    for (const produto of param.id_produtos) {
      const pedidoProduto = new PedidoProduto();
      pedidoProduto.id_pedido = param.id_pedido;
      pedidoProduto.id_produto = produto;
      await this.pedidoProdutoRepo.create(pedidoProduto);
    }
  }
}
