import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Controller('nota-fiscal')
export class NotaFiscalController {
  constructor(private readonly notaFiscalService: NotaFiscalService) {}

  @Post()
  create(@Body() createNotaFiscalDto: CreateNotaFiscalDto) {
    return this.notaFiscalService.create(createNotaFiscalDto);
  }

  @Get()
  findAll() {
    return this.notaFiscalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaFiscalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotaFiscalDto: UpdateNotaFiscalDto) {
    return this.notaFiscalService.update(+id, updateNotaFiscalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaFiscalService.remove(+id);
  }
}
