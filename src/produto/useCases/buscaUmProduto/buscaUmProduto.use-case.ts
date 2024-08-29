import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from 'src/produto/models/interfaces/produtoRepo.interface';

@Injectable()
export class BuscaUmProdutoUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(id: number) {
    const produto = await this.produtoRepo.findOne(id);
    if (!produto) {
      throw new BadRequestException({ message: 'Produto não encontrado' });
    }
    return produto;
  }
}
