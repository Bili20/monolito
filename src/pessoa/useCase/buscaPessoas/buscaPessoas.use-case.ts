import { Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';

@Injectable()
export class BuscaPessoasUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute() {
    return await this.pessoaRepo.find();
  }
}
