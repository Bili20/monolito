import { Inject, Injectable } from '@nestjs/common';
import { CriaPessoaDto } from 'src/pessoa/models/dto/criaPessoa.dto';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';

@Injectable()
export class CriaPessoaUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: CriaPessoaDto) {}
}
