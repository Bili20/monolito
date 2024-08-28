import { Inject, Injectable } from '@nestjs/common';
import { IEnderecoRepo } from 'src/pessoa/models/interfaces/enderecorepo.interface';

@Injectable()
export class BuscaUmEnderecoPrincipalUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;

  async execute(id_pessoa: number) {
    return await this.enderecoRepo.findOneEnderecoPrincipalPessoa(id_pessoa);
  }
}
