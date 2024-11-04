import { InjectRepository } from '@nestjs/typeorm';
import { IProdutoRepo } from '../models/interfaces/produtoRepo.interface';
import { Produto } from '../models/entities/produto.entity';
import { Repository } from 'typeorm';

export class ProdutoRepo implements IProdutoRepo {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async create(param: Produto): Promise<Produto> {
    return await this.produtoRepo.save(param);
  }

  async findOne(id: number): Promise<Produto> {
    return await this.produtoRepo.findOne({ where: { id: id } });
  }

  async find(): Promise<Produto[]> {
    return await this.produtoRepo.find();
  }

  async update(id: number, param: Produto): Promise<void> {
    await this.produtoRepo.update(id, param);
  }
}
