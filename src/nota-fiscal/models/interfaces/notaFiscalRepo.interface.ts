import { NotaFiscal } from '../entities/nota-fiscal.entity';

export interface INotaFiscalRepo {
  create(param: NotaFiscal): Promise<NotaFiscal>;
  findOne(id: number): Promise<NotaFiscal>;
  find(id_pedido: number): Promise<NotaFiscal[]>;
}
