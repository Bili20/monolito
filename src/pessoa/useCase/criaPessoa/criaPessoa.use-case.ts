import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CriaPessoaDto } from 'src/pessoa/models/dto/criaPessoa.dto';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';
import { CriaEnderecoUseCase } from '../criaEndereco/criaEndereco.use-case';
import { isCPF } from 'validation-br';

@Injectable()
export class CriaPessoaUsecase {
  @Inject(CriaEnderecoUseCase)
  private readonly criaEnderecoUseCase: CriaEnderecoUseCase;
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: CriaPessoaDto) {
    try {
      if (!isCPF(param.documento)) {
        throw new BadRequestException({ message: 'Documento inválido.' });
      }
      const pessoa = new Pessoa(param);

      const dataPessoa = await this.pessoaRepo.create(pessoa);
      param.endereco.id_pessoa = dataPessoa.id;
      await this.criaEnderecoUseCase.execute(param.endereco);
    } catch (e) {
      if (e.code == 23505) {
        e.response = 'Documento já cadastrado.';
      }
      throw new HttpException(
        e.response ?? 'Erro ao cadastrar pessoa.',
        e.status ?? 400,
      );
    }
  }
}
