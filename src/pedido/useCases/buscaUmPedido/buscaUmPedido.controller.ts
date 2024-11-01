import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BuscaUmPedidoUsecase } from './buscaUmPedido.use-case';

@Controller('pedido')
export class BuscaUmPedidoController {
  @Inject(BuscaUmPedidoUsecase)
  private readonly buscaUmPedidoUsecase: BuscaUmPedidoUsecase;

  @Get(':id')
  async buscaUm(@Param('id') id: number) {
    return await this.buscaUmPedidoUsecase.execute(id);
  }
}
