import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IProdutoRepo } from 'src/produto/models/interfaces/produtoRepo.interface';
import { BuscaUmProdutoUseCase } from '../buscaUmProduto/buscaUmProduto.use-case';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;
  @Inject(BuscaUmProdutoUseCase)
  private readonly buscaUmProdutoUseCase: BuscaUmProdutoUseCase;

  async execute(id: number, quantidade: number) {
    const produto = await this.buscaUmProdutoUseCase.execute(id);

    if (quantidade > produto.qtd_estoque) {
      throw new BadRequestException({
        message: 'Sem quantidade de produto em estoque.',
      });
    }
    const valorDesconto = produto.qtd_estoque - quantidade;
    produto.qtd_estoque = valorDesconto;
    await this.produtoRepo.update(id, produto);
  }
}
