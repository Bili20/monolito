import { Inject } from '@nestjs/common';
import { CreateHistoricoDto } from 'src/pedido/models/dto/criaHistorico.dto';
import { Historico } from 'src/pedido/models/entities/historico.entity';
import { IHistoricoRepo } from 'src/pedido/models/interfaces/historicoRepo.interface';

export class CriaHistoricoUseCase {
  @Inject('IHistoricoRepo')
  private readonly historicoRepo: IHistoricoRepo;

  async execute(param: CreateHistoricoDto) {
    const historico = new Historico();
    historico.id_pedido = param.id_pedido;
    historico.status = param.status;
    await this.historicoRepo.create(historico);
  }
}
