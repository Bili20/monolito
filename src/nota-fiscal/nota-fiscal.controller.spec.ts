import { Test, TestingModule } from '@nestjs/testing';
import { NotaFiscalController } from './nota-fiscal.controller';
import { NotaFiscalService } from './nota-fiscal.service';

describe('NotaFiscalController', () => {
  let controller: NotaFiscalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaFiscalController],
      providers: [NotaFiscalService],
    }).compile();

    controller = module.get<NotaFiscalController>(NotaFiscalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
