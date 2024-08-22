import { Pessoa } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  findOne(id: number): Promise<Pessoa>;
  create(param: Pessoa): Promise<void>;
  update(id: number, param: Pessoa): Promise<void>;
  delete(id: number): Promise<void>;
}
