import { Inject, Injectable } from '@nestjs/common';
import { AtualizaEnderecoDTO } from 'src/pessoa/models/dto/atualizaEndereco.dto';
import { Endereco } from 'src/pessoa/models/entities/endereco.entity';
import { IEnderecoRepo } from 'src/pessoa/models/interfaces/enderecorepo.interface';
import { BuscaUmEnderecoPrincipalUseCase } from '../bsucaUmEnderecoPrincipal/buscaUmEnderecoPrincipal.use-case';

@Injectable()
export class AtualizaEnderecoUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;
  @Inject(BuscaUmEnderecoPrincipalUseCase)
  private readonly buscaUmEnderecoPrincipalUseCase: BuscaUmEnderecoPrincipalUseCase;

  async execute(id: number, param: AtualizaEnderecoDTO) {
    if (param.principal == true) {
      const endereco = await this.buscaUmEnderecoPrincipalUseCase.execute(
        param.id_pessoa,
      );
      if (endereco && endereco.id != id) {
        endereco.principal = false;
        await this.enderecoRepo.update(endereco.id, endereco);
      }
    }

    const endereco = new Endereco(param);
    await this.enderecoRepo.update(id, endereco);
  }
}
