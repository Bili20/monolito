import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoaRepo.interface';

@Injectable()
export class BuscaUmaPessoaUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(id: number) {
    const pessoa = await this.pessoaRepo.findOne(id);
    if (!pessoa) {
      throw new BadRequestException({ messgae: 'Pessoa não encontrada.' });
    }
    return pessoa;
  }
}
