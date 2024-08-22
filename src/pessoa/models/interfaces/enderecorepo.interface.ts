import { Endereco } from '../entities/endereco.entity';

export interface IEnderecoRepo {
  create(param: Endereco): Promise<Endereco>;
}
