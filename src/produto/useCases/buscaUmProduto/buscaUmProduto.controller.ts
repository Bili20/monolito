import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BuscaUmProdutoUseCase } from './buscaUmProduto.use-case';

@Controller('produto')
export class BuscaUmProdutoController {
  @Inject(BuscaUmProdutoUseCase)
  private readonly buscaUmProdutoUseCase: BuscaUmProdutoUseCase;

  @Get(':id')
  async buscaUm(@Param('id') id: number) {
    return await this.buscaUmProdutoUseCase.execute(id);
  }
}
