import { Module } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { NotaFiscalController } from './nota-fiscal.controller';

@Module({
  controllers: [NotaFiscalController],
  providers: [NotaFiscalService],
})
export class NotaFiscalModule {}
