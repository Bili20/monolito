import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../../models/interfaces/pedidoRepo.interface';
import { CriaPedidoDto } from '../../models/dto/criaPedido.dto';
import { BuscaUmProdutoUseCase } from 'src/produto/useCases/buscaUmProduto/buscaUmProduto.use-case';
import { CriaPedidoProdutoUseCase } from '../criaPedidoProduto/criaPedidoProduto.use-case';
import { Pedido } from 'src/pedido/models/entities/pedido.entity';
import { AtualizaEstoqueUseCase } from 'src/produto/useCases/atualizaEstoque/atualizaEstoque.use-case';

@Injectable()
export class CriaPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject(BuscaUmProdutoUseCase)
  private readonly buscaUmProdutoUseCase: BuscaUmProdutoUseCase;
  @Inject(CriaPedidoProdutoUseCase)
  private readonly criaPedidoProdutoUseCase: CriaPedidoProdutoUseCase;
  @Inject(AtualizaEstoqueUseCase)
  private readonly atualizaEstoqueUseCase: AtualizaEstoqueUseCase;

  async execute(param: CriaPedidoDto) {
    try {
      const pedido = new Pedido();
      pedido.quantidade = 0;
      pedido.id_pessoa = param.id_pessoa;
      pedido.total = 0;

      const arrayProduto = [];
      for (const produto of param.produtos) {
        const dataProduto = await this.buscaUmProdutoUseCase.execute(
          produto.id_produto,
        );

        await this.atualizaEstoqueUseCase.execute(
          produto.id_produto,
          produto.quantidade,
        );

        pedido.total = pedido.total + dataProduto.valor * produto.quantidade;
        pedido.quantidade = pedido.quantidade + produto.quantidade;
        arrayProduto.push(produto.id_produto);
      }
      const dataPedido = await this.pedidoRepo.create(pedido);
      await this.criaPedidoProdutoUseCase.execute({
        id_pedido: dataPedido.id,
        id_produtos: arrayProduto,
      });
      // TODO: falta o gera nota fiscal
    } catch (e) {
      console.log(e);
      throw new HttpException(
        e.response ?? 'Erro ao fazer pedido.',
        e.status ?? 400,
      );
    }
  }
}
