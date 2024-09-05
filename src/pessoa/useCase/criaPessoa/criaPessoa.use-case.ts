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
import { CriaEnderecoDTO } from 'src/pessoa/models/dto/criaEndereco.dto';

@Injectable()
export class CriaPessoaUsecase {
  @Inject(CriaEnderecoUseCase)
  private readonly criaEnderecoUseCase: CriaEnderecoUseCase;
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: CriaPessoaDto & { endereco?: CriaEnderecoDTO }) {
    try {
      if (!isCPF(param.documento)) {
        throw new BadRequestException({ message: 'Documento inválido.' });
      }
      const pessoa = new Pessoa();
      pessoa.nome = param.nome;
      pessoa.email = param.email;
      pessoa.documento = param.documento;
      pessoa.data_nacimento = param.data_nacimento;
      pessoa.sexo = param.sexo;
      pessoa.telefone = param.telefone;

      const dataPessoa = await this.pessoaRepo.create(pessoa);
      if (param.endereco) {
        param.endereco.id_pessoa = dataPessoa.id;
        await this.criaEnderecoUseCase.execute(param.endereco);
      }
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
