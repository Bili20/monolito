import { Controller, Get, Inject } from '@nestjs/common';
import { BuscaPedidosUseCase } from './buscaPedidos.use-case';

@Controller('pedidos')
export class BuscaPedidosController {
  @Inject(BuscaPedidosUseCase)
  private readonly buscaPedidosUseCase: BuscaPedidosUseCase;

  @Get()
  async buscaPedidos() {
    return await this.buscaPedidosUseCase.execute();
  }
}
