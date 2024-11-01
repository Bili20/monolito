import { Controller, Get, Inject } from '@nestjs/common';
import { BuscaPessoasUseCase } from './buscaPessoas.use-case';

@Controller('pessoas')
export class BuscaPessoasController {
  @Inject(BuscaPessoasUseCase)
  private readonly buscaPessoasUseCase: BuscaPessoasUseCase;

  @Get()
  async buscaPessoas() {
    return await this.buscaPessoasUseCase.execute();
  }
}
