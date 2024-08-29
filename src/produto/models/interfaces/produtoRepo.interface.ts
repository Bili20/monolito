import { Produto } from '../entities/produto.entity';

export interface IProdutoRepo {
  create(param: Produto): Promise<Produto>;
  findOne(id: number): Promise<Produto>;
  update(id: number, param: Produto): Promise<void>;
}
