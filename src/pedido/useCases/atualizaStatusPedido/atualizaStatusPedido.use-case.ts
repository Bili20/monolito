import { Inject, Injectable } from '@nestjs/common';
import { AtualizaStatusDto } from 'src/nota-fiscal/models/dto/atualizaStatus.dto';
import { Pedido } from 'src/pedido/models/entities/pedido.entity';
import { IPedidoRepo } from 'src/pedido/models/interfaces/pedidoRepo.interface';
import { CriaHistoricoUseCase } from '../criaHistorico/criaHistorico.use-case';

@Injectable()
export class AtualizaStatusPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject(CriaHistoricoUseCase)
  private readonly criaHistoricoUseCase: CriaHistoricoUseCase;

  async execute(id: number, param: AtualizaStatusDto) {
    const pedido = await this.pedidoRepo.findOne(id);
    delete pedido.pedidoProduto;
    pedido.verificaStatus(param.status);
    pedido.data_atualizacao = new Date();
    pedido.status = param.status;

    await this.pedidoRepo.update(id, pedido);
    await this.criaHistoricoUseCase.execute({
      status: param.status,
      id_pedido: pedido.id,
    });
  }
}
