import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaEnderecoUseCase } from './criaEndereco.use-case';
import { CriaEnderecoDTO } from 'src/pessoa/models/dto/criaEndereco.dto';

@Controller('endereco')
export class CriaEnderecoController {
  @Inject(CriaEnderecoUseCase)
  private readonly criaEnderecoUseCase: CriaEnderecoUseCase;

  @Post()
  async criaEndereco(@Body() param: CriaEnderecoDTO) {
    return await this.criaEnderecoUseCase.execute(param);
  }
}
