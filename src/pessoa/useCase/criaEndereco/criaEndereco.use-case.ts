import { Inject, Injectable } from '@nestjs/common';
import { CriaEnderecoDTO } from 'src/pessoa/models/dto/criaEndereco.dto';
import { Endereco } from 'src/pessoa/models/entities/endereco.entity';
import { IEnderecoRepo } from 'src/pessoa/models/interfaces/enderecorepo.interface';
import { BuscaUmEnderecoPrincipalUseCase } from '../bsucaUmEnderecoPrincipal/buscaUmEnderecoPrincipal.use-case';
@Injectable()
export class CriaEnderecoUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;
  @Inject(BuscaUmEnderecoPrincipalUseCase)
  private readonly buscaUmEnderecoPrincipalUseCase: BuscaUmEnderecoPrincipalUseCase;

  async execute(param: CriaEnderecoDTO) {
    if (param.principal == true) {
      const endereco = await this.buscaUmEnderecoPrincipalUseCase.execute(
        param.id_pessoa,
      );
      if (endereco) {
        endereco.principal = false;
        await this.enderecoRepo.update(endereco.id, endereco);
      }
    }
    const endereco = new Endereco(param);
    await this.enderecoRepo.create(endereco);
    return;
  }
}
