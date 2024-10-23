import { InjectRepository } from '@nestjs/typeorm';
import { IPedidoRepo } from '../models/interfaces/pedidoRepo.interface';
import { Pedido } from '../models/entities/pedido.entity';
import { Repository } from 'typeorm';

export class PedidoRepo implements IPedidoRepo {
  constructor(
    @InjectRepository(Pedido) private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  async create(param: Pedido): Promise<Pedido> {
    return await this.pedidoRepo.manager.save(param);
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.pedidoRepo.findOne({
      where: { id: id },
      relations: { pedidoProduto: true },
    });
  }

  async update(id: number, param: Pedido): Promise<void> {
    await this.pedidoRepo.update(id, param);
  }
}
