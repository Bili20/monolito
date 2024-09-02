import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { NotaFiscal } from './models/entities/nota-fiscal.entity';
import { NotaFiscalRepo } from './repository/notaFiscalRepoRepo';
import { CriaNotaFiscalUseCase } from './useCase/criaNotaFiscal/criaNotaFiscal.use-case';
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
