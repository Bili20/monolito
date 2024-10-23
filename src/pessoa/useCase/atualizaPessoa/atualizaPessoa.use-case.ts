import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AtualizaPessoaDTO } from 'src/pessoa/models/dto/atualizaPessoa.dto';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';
import { BuscaUmaPessoaUsecase } from '../buscaUmaPessoa/buscaUmaPessoa.use-case';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
import { AtualizaEnderecoUseCase } from '../atualizaEndereco/atualizaEndereco.use-case';

@Injectable()
export class AtualizaPessoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(BuscaUmaPessoaUsecase)
  private readonly buscaUmaPessoaUsecase: BuscaUmaPessoaUsecase;
  @Inject(AtualizaEnderecoUseCase)
  private readonly atualizaEnderecoUseCase: AtualizaEnderecoUseCase;

  async execute(id: number, param: AtualizaPessoaDTO) {
    try {
      const dataPessoa = await this.buscaUmaPessoaUsecase.execute(id);
      if (param.endereco) {
        await this.atualizaEnderecoUseCase.execute(
          dataPessoa.endereco[0].id,
          param.endereco,
        );
      }
      delete param.endereco;
      const pessoa = new Pessoa(param);
      if (Object.keys(pessoa).length > 0) {
        await this.pessoaRepo.update(id, pessoa);
      }
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao atualizar dados da pessoa.',
        e.status ?? 400,
      );
    }
  }
}
