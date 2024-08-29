import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaFiscal } from './models/entities/nota-fiscal.entity';
import { CriaNotaFiscalUseCase } from './useCase/criaNotaFiscal/criaNotaFiscal.use-case';
import { NotaFiscalRepo } from './repository/notaFiscalRepoRepo';
import { CriaNotaFiscalController } from './useCase/criaNotaFiscal/criaNotaFiscal.controller';
import { PessoaModule } from 'src/pessoa/pessoa.module';
@Module({
  imports: [TypeOrmModule.forFeature([NotaFiscal]), PessoaModule],
  controllers: [CriaNotaFiscalController],
  providers: [
    CriaNotaFiscalUseCase,
    NotaFiscalRepo,
    { provide: 'INotaFiscalRepo', useExisting: NotaFiscalRepo },
  ],
})
export class NotaFiscalModule {}
