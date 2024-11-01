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
import { BuscaUmPedidoUsecase } from './useCases/buscaUmPedido/buscaUmPedido.use-case';
import { EnviaEmailUseCase } from 'src/email/enviaEmail.use-case';
import { AtualizaStatusPedidoUseCase } from './useCases/atualizaStatusPedido/atualizaStatusPedido.use-case';
import { AtualizaStatusPedidoController } from './useCases/atualizaStatusPedido/atualizaStatusPedido.controller';
import { CriaHistoricoUseCase } from './useCases/criaHistorico/criaHistorico.use-case';
import { HistoricoRepo } from './repository/historicoRepo';
import { Historico } from './models/entities/historico.entity';
import { BuscaUmPedidoController } from './useCases/buscaUmPedido/buscaUmPedido.controller';
import { BuscaPedidosController } from './useCases/buscaPedidos/buscaPedido.controller';
import { BuscaPedidosUseCase } from './useCases/buscaPedidos/buscaPedidos.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoProduto, Historico]),
    ProdutoModule,
    NotaFiscalModule,
  ],
  controllers: [
    CriaPedidoController,
    AtualizaStatusPedidoController,
    BuscaUmPedidoController,
    BuscaPedidosController,
  ],
  providers: [
    CriaPedidoProdutoUseCase,
    BuscaUmPedidoUsecase,
    BuscaPedidosUseCase,
    CriaPedidoUseCase,
    AtualizaStatusPedidoUseCase,
    PedidoRepo,
    PedidoProdutoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
    CriaHistoricoUseCase,
    HistoricoRepo,
    { provide: 'IHistoricoRepo', useExisting: HistoricoRepo },
    EnviaEmailUseCase,
  ],
  exports: [BuscaUmPedidoUsecase],
})
export class PedidoModule {}
