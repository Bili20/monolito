import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { INotaFiscalRepo } from 'src/nota-fiscal/models/interfaces/notaFiscalRepo.interface';
import { BuscaUmaPessoaUsecase } from 'src/pessoa/useCase/buscaUmaPessoa/buscaUmaPessoa.use-case';
import * as PDFDocument from 'pdfkit';
const crypto = require('crypto');
import * as fs from 'fs';
import { DadoEmpresa } from 'src/constants/contants';
import { NotaFiscal } from 'src/nota-fiscal/models/entities/nota-fiscal.entity';

@Injectable()
export class CriaNotaFiscalUseCase {
  @Inject('INotaFiscalRepo')
  private readonly notaFiscalrepo: INotaFiscalRepo;
  @Inject(BuscaUmaPessoaUsecase)
  private readonly buscaUmaPessoaUsecase: BuscaUmaPessoaUsecase;

  async execute(id_pedido?: number) {
    let pdfNota;
    try {
      pdfNota = await this.geraPdfNotaFiscal();
      const notaFiscal = new NotaFiscal();
      notaFiscal.anexo = pdfNota;
      notaFiscal.id_pedido = 1; //id_pedido;
      await this.notaFiscalrepo.create(notaFiscal);
    } catch (e) {
      fs.unlinkSync('./notas/' + pdfNota);
      throw new HttpException(
        e.response ?? 'Erro ao gerar nota fiscal.',
        e.status ?? 400,
      );
    }
  }

  async geraPdfNotaFiscal() {
    const doc = new PDFDocument();
    // pedidos aqui

    const pessoa = await this.buscaUmaPessoaUsecase.execute(1);

    const numeroNota = crypto.randomInt(1, 1000);
    const filePath = 'nota_fiscal' + numeroNota + '.pdf';

    doc.fontSize(18).text('Nota Fiscal', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Número: ${numeroNota}`);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Comprador: ${pessoa.nome}`);
    doc.text(`Documento: ${pessoa.documento}`);
    doc.text(`Endereço: ${pessoa.endereco.cep}`);
    doc.moveDown();
    doc.text(`Vendedor: ${DadoEmpresa.nome}`);
    doc.text(`CNPJ: ${DadoEmpresa.cnpj}`);
    doc.text(`Endereço: ${DadoEmpresa.endereco}`);
    doc.moveDown();

    doc.text('Produtos: ');
    // faz um for dos produtos.

    const writeStream = fs.createWriteStream('./notas/' + filePath);

    doc.pipe(writeStream);
    doc.end();

    writeStream.on('error', (err) => {
      throw new BadRequestException({
        messgae: 'Erro ao salvar o arquivo:',
        err,
      });
    });

    return filePath;
  }
}
