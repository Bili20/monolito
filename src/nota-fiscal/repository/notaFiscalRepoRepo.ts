import { InjectRepository } from '@nestjs/typeorm';
import { INotaFiscalRepo } from '../models/interfaces/notaFiscalRepo.interface';
import { NotaFiscal } from '../models/entities/nota-fiscal.entity';
import { Repository } from 'typeorm';

export class NotaFiscalRepo implements INotaFiscalRepo {
  constructor(
    @InjectRepository(NotaFiscal)
    private readonly notaFiscalRepo: Repository<NotaFiscal>,
  ) {}

  async create(param: NotaFiscal): Promise<NotaFiscal> {
    return await this.notaFiscalRepo.save(param);
  }

  async find(id_pedido: number): Promise<NotaFiscal[]> {
    return await this.notaFiscalRepo.find({ where: { id_pedido: id_pedido } });
  }

  async findOne(id: number): Promise<NotaFiscal> {
    return await this.notaFiscalRepo.findOne({ where: { id: id } });
  }
}
