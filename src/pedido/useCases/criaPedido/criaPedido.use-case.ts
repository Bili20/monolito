import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../../models/interfaces/pedidoRepo.interface';
import { CriaPedidoDto } from '../../models/dto/criaPedido.dto';
import { BuscaUmProdutoUseCase } from 'src/produto/useCases/buscaUmProduto/buscaUmProduto.use-case';
import { CriaPedidoProdutoUseCase } from '../criaPedidoProduto/criaPedidoProduto.use-case';
import { Pedido } from 'src/pedido/models/entities/pedido.entity';
import { AtualizaEstoqueUseCase } from 'src/produto/useCases/atualizaEstoque/atualizaEstoque.use-case';
import { CriaNotaFiscalUseCase } from 'src/nota-fiscal/useCase/criaNotaFiscal/criaNotaFiscal.use-case';
import { ProdutosNotaDTO } from 'src/nota-fiscal/models/dto/produtosNota.dto';
import { EnviaEmailUseCase } from 'src/email/enviaEmail.use-case';
import { ProdutosQuantidadeDTO } from 'src/pedido/models/dto/produtosQuatidade.dto';
import { StatusEnum } from 'src/enum/status.enum';
import { CriaHistoricoUseCase } from '../criaHistorico/criaHistorico.use-case';

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
  @Inject(CriaNotaFiscalUseCase)
  private readonly criaNotaFiscalUseCase: CriaNotaFiscalUseCase;
  @Inject(EnviaEmailUseCase)
  private readonly enviaEmailUseCase: EnviaEmailUseCase;
  @Inject(CriaHistoricoUseCase)
  private readonly criaHistoricoUseCase: CriaHistoricoUseCase;

  async execute(param: CriaPedidoDto) {
    try {
      const produto = await this.geraArrayDosProdutosDoPedido(
        param.id_pessoa,
        param.produtos,
      );
      const dataPedido = await this.pedidoRepo.create(produto.pedido);
      await this.criaPedidoProdutoUseCase.execute({
        id_pedido: dataPedido.id,
        produtos: produto.arrayProduto,
      });
      await this.criaHistoricoUseCase.execute({
        status: StatusEnum.EM_PROCESSAMENTO,
        id_pedido: dataPedido.id,
      });

      await this.geraNotaFiscalDoPedido(dataPedido, produto.arrayProduto);
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao fazer pedido.',
        e.status ?? 400,
      );
    }
  }

  private async geraNotaFiscalDoPedido(
    pedido: Pedido,
    arrayProduto: ProdutosNotaDTO[],
  ) {
    const pdfNota = await this.criaNotaFiscalUseCase.execute(
      pedido,
      arrayProduto,
    );
    await this.enviaEmailUseCase.execute(pdfNota.pessoa);
  }

  private async geraArrayDosProdutosDoPedido(
    id_pessoa: number,
    produtos: ProdutosQuantidadeDTO[],
  ) {
    const pedido = new Pedido();
    pedido.quantidade = 0;
    pedido.id_pessoa = id_pessoa;
    pedido.data_atualizacao = new Date();
    pedido.status = StatusEnum.EM_PROCESSAMENTO;
    pedido.total = 0;

    const arrayProduto: ProdutosNotaDTO[] = [];
    for (const produto of produtos) {
      const dataProduto = await this.buscaUmProdutoUseCase.execute(
        produto.id_produto,
      );

      await this.atualizaEstoqueUseCase.execute(
        produto.quantidade,
        dataProduto,
      );

      pedido.total = pedido.total + dataProduto.valor * produto.quantidade;
      pedido.quantidade = pedido.quantidade + produto.quantidade;
      arrayProduto.push({
        id: dataProduto.id,
        nome: dataProduto.nome,
        quantidade: produto.quantidade,
        valor: dataProduto.valor,
      });
    }
    return { arrayProduto, pedido };
  }
}
