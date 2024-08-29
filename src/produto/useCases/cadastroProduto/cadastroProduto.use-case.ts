import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CadastroProdutoDto } from 'src/produto/models/dto/cadastroProduto.dto';
import { Produto } from 'src/produto/models/entities/produto.entity';
import { IProdutoRepo } from 'src/produto/models/interfaces/produtoRepo.interface';

@Injectable()
export class CadastroProdutoUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(param: CadastroProdutoDto) {
    try {
      const produto = new Produto(param);
      await this.produtoRepo.create(produto);
    } catch (e) {
      if (e.code == 23505) {
        e.response = 'Produto já cadastrado.';
      }
      throw new HttpException(
        e.response ?? 'Erro ao cadastrar produto.',
        e.status ?? 400,
      );
    }
  }
}
