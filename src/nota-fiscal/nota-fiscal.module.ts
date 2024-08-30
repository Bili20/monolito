import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaFiscal } from './models/entities/nota-fiscal.entity';
import { CriaNotaFiscalUseCase } from './useCase/criaNotaFiscal/criaNotaFiscal.use-case';
import { NotaFiscalRepo } from './repository/notaFiscalRepoRepo';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { PedidoModule } from 'src/pedido/pedido.module';
@Module({
  imports: [TypeOrmModule.forFeature([NotaFiscal]), PessoaModule],
  controllers: [],
  providers: [
    CriaNotaFiscalUseCase,
    NotaFiscalRepo,
    { provide: 'INotaFiscalRepo', useExisting: NotaFiscalRepo },
  ],
  exports: [CriaNotaFiscalUseCase],
})
export class NotaFiscalModule {}
