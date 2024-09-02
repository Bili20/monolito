import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaPessoaUsecase } from './criaPessoa.use-case';
import { CriaPessoaDto } from 'src/pessoa/models/dto/criaPessoa.dto';
import { CriaEnderecoDTO } from 'src/pessoa/models/dto/criaEndereco.dto';

@Controller('pessoa')
export class CriapessoaController {
  @Inject(CriaPessoaUsecase)
  private readonly criaPessoaUsecase: CriaPessoaUsecase;

  @Post()
  async criaPessoa(
    @Body() param: CriaPessoaDto & { endereco: CriaEnderecoDTO },
  ) {
    return await this.criaPessoaUsecase.execute(param);
  }
}
