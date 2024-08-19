import { Injectable } from '@nestjs/common';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Injectable()
export class NotaFiscalService {
  create(createNotaFiscalDto: CreateNotaFiscalDto) {
    return 'This action adds a new notaFiscal';
  }

  findAll() {
    return `This action returns all notaFiscal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notaFiscal`;
  }

  update(id: number, updateNotaFiscalDto: UpdateNotaFiscalDto) {
    return `This action updates a #${id} notaFiscal`;
  }

  remove(id: number) {
    return `This action removes a #${id} notaFiscal`;
  }
}
