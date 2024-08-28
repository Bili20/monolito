import { Inject, Injectable } from '@nestjs/common';
import { CriaEnderecoDTO } from 'src/pessoa/models/dto/criaEndereco.dto';
import { Endereco } from 'src/pessoa/models/entities/endereco.entity';
import { IEnderecoRepo } from 'src/pessoa/models/interfaces/enderecorepo.interface';

@Injectable()
export class CriaEnderecoUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;

  async execute(param: CriaEnderecoDTO) {
    const endereco = new Endereco(param);
    await this.enderecoRepo.create(endereco);
  }
}
