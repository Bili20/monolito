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

  async execute(param: CriaPedidoDto) {
    try {
      const pedido = new Pedido();
      pedido.quantidade = 0;
      pedido.id_pessoa = param.id_pessoa;
      pedido.total = 0;

      const arrayProduto: ProdutosNotaDTO[] = [];

      for (const produto of param.produtos) {
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
      const dataPedido = await this.pedidoRepo.create(pedido);
      await this.criaPedidoProdutoUseCase.execute({
        id_pedido: dataPedido.id,
        produtos: arrayProduto,
      });

      const pdfNota = await this.criaNotaFiscalUseCase.execute(
        dataPedido,
        arrayProduto,
      );
      await this.enviaEmailUseCase.execute(
        pdfNota.pessoa,
        {
          numero: pdfNota.numero,
          data_cadastro: pdfNota.dataCadastro,
          total: pedido.total,
        },
        `./notas/${pdfNota.filePath}`,
      );
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao fazer pedido.',
        e.status ?? 400,
      );
    }
  }
}
