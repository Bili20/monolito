import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BuscaUmaPessoaUsecase } from './buscaUmaPessoa.use-case';

@Controller('pessoa')
export class BuscaUmaPessoaController {
  @Inject(BuscaUmaPessoaUsecase)
  private readonly buscaUmaPessoaUsecase: BuscaUmaPessoaUsecase;

  @Get(':id')
  async buscaUma(@Param('id') id: number) {
    await this.buscaUmaPessoaUsecase.execute(id);
  }
}
