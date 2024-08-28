import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaPessoaUsecase } from './criaPessoa.use-case';
import { CriaPessoaDto } from 'src/pessoa/models/dto/criaPessoa.dto';

@Controller('pessoa')
export class CriapessoaController {
  @Inject(CriaPessoaUsecase)
  private readonly criaPessoaUsecase: CriaPessoaUsecase;

  @Post()
  criaPessoa(@Body() param: CriaPessoaDto) {
    return this.criaPessoaUsecase.execute(param);
  }
}