import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CadastroProdutoUseCase } from './cadastroProduto.use-case';
import { CadastroProdutoDto } from 'src/produto/models/dto/cadastroProduto.dto';

@Controller('produto')
export class CadastroProdutoController {
  @Inject(CadastroProdutoUseCase)
  private readonly cadastroProdutoUseCase: CadastroProdutoUseCase;

  @Post()
  cadastroProduto(@Body() param: CadastroProdutoDto) {
    return this.cadastroProdutoUseCase.execute(param);
  }
}
