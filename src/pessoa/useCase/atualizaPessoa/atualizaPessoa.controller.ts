import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import { AtualizaPessoaUseCase } from './atualizaPessoa.use-case';
import { AtualizaPessoaDTO } from 'src/pessoa/models/dto/atualizaPessoa.dto';

@Controller('pessoa')
export class AtualizaPessoaController {
  @Inject(AtualizaPessoaUseCase)
  private readonly atualizaPessoaUseCase: AtualizaPessoaUseCase;

  @Patch(':id/atualiza')
  async atualizaPessoa(
    @Param('id') id: number,
    @Body() param: AtualizaPessoaDTO,
  ) {
    return await this.atualizaPessoaUseCase.execute(id, param);
  }
}
