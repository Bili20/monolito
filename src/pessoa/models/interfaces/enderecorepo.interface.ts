import { Endereco } from '../entities/endereco.entity';

export interface IEnderecoRepo {
  create(param: Endereco): Promise<Endereco>;
  update(id: number, param: Endereco): Promise<void>;
  findEnderecosPessoa(id_pessoa: number): Promise<Endereco[]>;
  findOneEnderecoPrincipalPessoa(id_pessoa: number): Promise<Endereco>;
}
