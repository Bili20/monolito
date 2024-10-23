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
import { AtualizaStatusPedidoUseCase } from './useCases/atualizaStatusPedido/atualizaStatusPedido.use-case';
import { AtualizaStatusPedidoController } from './useCases/atualizaStatusPedido/atualizaStatusPedido.controller';
import { CriaHistoricoUseCase } from './useCases/criaHistorico/criaHistorico.use-case';
import { HistoricoRepo } from './repository/historicoRepo';
import { Historico } from './models/entities/historico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoProduto, Historico]),
    ProdutoModule,
    NotaFiscalModule,
  ],
  controllers: [CriaPedidoController, AtualizaStatusPedidoController],
  providers: [
    CriaPedidoProdutoUseCase,
    BsucaUmPedidoUsecase,
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
  exports: [BsucaUmPedidoUsecase],
})
export class PedidoModule {}
