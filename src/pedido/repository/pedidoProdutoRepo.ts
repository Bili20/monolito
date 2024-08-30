import { Inject } from '@nestjs/common';
import { IPedidoProdutoRepo } from '../models/interfaces/pedidoProduto.interface';
import { CriaPedidoProdutoDTO } from '../models/dto/criaPedidoProduto.dto';
import { PedidoProduto } from '../models/entities/pedidoProduto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PedidoProdutoRepo implements IPedidoProdutoRepo {
  constructor(
    @InjectRepository(PedidoProduto)
    private readonly pedidoProdutoRepo: Repository<PedidoProduto>,
  ) {}

  async create(param: PedidoProduto): Promise<void> {
    await this.pedidoProdutoRepo.save(param);
  }
}
