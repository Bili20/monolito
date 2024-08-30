import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './models/entities/pedido.entity';
import { PedidoProduto } from './models/entities/pedidoProduto.entity';
import { CriaPedidoProdutoUseCase } from './useCases/criaPedidoProduto/criaPedidoProduto.use-case';
import { CriaPedidoUseCase } from './useCases/criaPedido/criaPedido.use-case';
import { PedidoRepo } from './repository/pedidoRepo';
import { PedidoProdutoRepo } from './repository/pedidoProdutoRepo';
import { ProdutoModule } from 'src/produto/produto.module';
import { CriaPedidoController } from './useCases/criaPedido/criaPedido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoProduto]), ProdutoModule],
  controllers: [CriaPedidoController],
  providers: [
    CriaPedidoProdutoUseCase,
    CriaPedidoUseCase,
    PedidoRepo,
    PedidoProdutoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
  ],
})
export class PedidoModule {}
