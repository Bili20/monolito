import { Controller, Get, Inject } from '@nestjs/common';
import { BuscaProdutosUseCase } from './buscaProdutos.use-case';

@Controller('produtos')
export class BuscaProdutosController {
  @Inject(BuscaProdutosUseCase)
  private readonly buscaProdutosUseCase: BuscaProdutosUseCase;

  @Get()
  async busca() {
    return await this.buscaProdutosUseCase.execute();
  }
}
