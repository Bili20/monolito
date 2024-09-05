import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Produto } from 'src/produto/models/entities/produto.entity';
import { IProdutoRepo } from 'src/produto/models/interfaces/produtoRepo.interface';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

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
