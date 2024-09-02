import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IProdutoRepo } from 'src/produto/models/interfaces/produtoRepo.interface';
import { BuscaUmProdutoUseCase } from '../buscaUmProduto/buscaUmProduto.use-case';
import { Produto } from 'src/produto/models/entities/produto.entity';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;
  @Inject(BuscaUmProdutoUseCase)
  private readonly buscaUmProdutoUseCase: BuscaUmProdutoUseCase;

  async execute(quantidade: number, produto: Produto) {
    if (quantidade > produto.qtd_estoque) {
      throw new BadRequestException({
        message: 'Sem quantidade de produto em estoque.',
      });
    }
    const valorDesconto = produto.qtd_estoque - quantidade;
    produto.qtd_estoque = valorDesconto;
    await this.produtoRepo.update(produto.id, produto);
  }
}
