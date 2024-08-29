import { Controller, Inject, Post } from '@nestjs/common';
import { CriaNotaFiscalUseCase } from './criaNotaFiscal.use-case';

@Controller('notaFiscal')
export class CriaNotaFiscalController {
  @Inject(CriaNotaFiscalUseCase)
  private readonly criaNotaFiscalUseCase: CriaNotaFiscalUseCase;

  @Post()
  teste() {
    return this.criaNotaFiscalUseCase.execute();
  }
}
