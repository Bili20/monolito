import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import { AtualizaStatusPedidoUseCase } from './atualizaStatusPedido.use-case';
import { AtualizaStatusDto } from 'src/nota-fiscal/models/dto/atualizaStatus.dto';

@Controller('pedido/status')
export class AtualizaStatusPedidoController {
  @Inject(AtualizaStatusPedidoUseCase)
  private readonly atualizaStatusPediaoUseCase: AtualizaStatusPedidoUseCase;

  @Patch(':id')
  async atualiza(@Param('id') id: number, @Body() param: AtualizaStatusDto) {
    await this.atualizaStatusPediaoUseCase.execute(id, param);
  }
}
