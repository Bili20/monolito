import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CriaPessoaDto } from 'src/pessoa/models/dto/criaPessoa.dto';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';
import { CriaEnderecoUseCase } from '../criaEndereco/criaEndereco.use-case';

@Injectable()
export class CriaPessoaUsecase {
  @Inject(CriaEnderecoUseCase)
  private readonly criaEnderecoUseCase: CriaEnderecoUseCase;
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: CriaPessoaDto) {
    try{
      const pessoa = new Pessoa(param);

      const dataPessoa = await this.pessoaRepo.create(pessoa);
      param.endereco.id_pessoa = dataPessoa.id
      await this.criaEnderecoUseCase.execute(param.endereco);
    }catch(e){
      throw new BadRequestException({message: 'Erro ao cadastrar pessoa.'})
    }
    
  }
}
