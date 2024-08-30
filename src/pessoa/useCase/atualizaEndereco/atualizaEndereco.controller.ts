import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import { AtualizaEnderecoUseCase } from './atualizaEndereco.use-case';
import { AtualizaEnderecoDTO } from 'src/pessoa/models/dto/atualizaEndereco.dto';

@Controller('endereco')
export class AtualizaEnderecoController {
  @Inject(AtualizaEnderecoUseCase)
  private readonly atualizaEnderecoUseCase: AtualizaEnderecoUseCase;

  @Patch(':id')
  async atualizaEndereco(
    @Param('id') id: number,
    @Body() param: AtualizaEnderecoDTO,
  ) {
    return await this.atualizaEnderecoUseCase.execute(id, param);
  }
}
