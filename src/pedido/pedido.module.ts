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
import { NotaFiscalModule } from 'src/nota-fiscal/nota-fiscal.module';
import { BsucaUmPedidoUsecase } from './useCases/buscaUmPedido/buscaUmPedido.use-case';
import { EnviaEmailUseCase } from 'src/email/enviaEmail.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoProduto]),
    ProdutoModule,
    NotaFiscalModule,
  ],
  controllers: [CriaPedidoController],
  providers: [
    CriaPedidoProdutoUseCase,
    BsucaUmPedidoUsecase,
    CriaPedidoUseCase,
    PedidoRepo,
    PedidoProdutoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
    EnviaEmailUseCase,
  ],
  exports: [BsucaUmPedidoUsecase],
})
export class PedidoModule {}
