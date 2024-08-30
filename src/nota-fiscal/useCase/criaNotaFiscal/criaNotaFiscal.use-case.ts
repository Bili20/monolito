import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { DadoEmpresa } from 'src/constants/contants';
import { ProdutosNotaDTO } from 'src/nota-fiscal/models/dto/produtosNota.dto';
import { NotaFiscal } from 'src/nota-fiscal/models/entities/nota-fiscal.entity';
import { INotaFiscalRepo } from 'src/nota-fiscal/models/interfaces/notaFiscalRepo.interface';
import { Pedido } from 'src/pedido/models/entities/pedido.entity';
import { BuscaUmaPessoaUsecase } from 'src/pessoa/useCase/buscaUmaPessoa/buscaUmaPessoa.use-case';

@Injectable()
export class CriaNotaFiscalUseCase {
  @Inject('INotaFiscalRepo')
  private readonly notaFiscalrepo: INotaFiscalRepo;
  @Inject(BuscaUmaPessoaUsecase)
  private readonly buscaUmaPessoaUsecase: BuscaUmaPessoaUsecase;

  async execute(pedido: Pedido, produtos: ProdutosNotaDTO[]) {
    let pdfNota;
    try {
      pdfNota = await this.geraPdfNotaFiscal(pedido, produtos);
      const notaFiscal = new NotaFiscal();
      notaFiscal.anexo = pdfNota;
      notaFiscal.id_pedido = pedido.id;
      await this.notaFiscalrepo.create(notaFiscal);
    } catch (e) {
      fs.unlinkSync('./notas/' + pdfNota);
      console.log(e);
      throw new HttpException(
        e.response ?? 'Erro ao gerar nota fiscal.',
        e.status ?? 400,
      );
    }
  }

  private async geraPdfNotaFiscal(pedido: Pedido, produtos: ProdutosNotaDTO[]) {
    const doc = new PDFDocument();
    const pessoa = await this.buscaUmaPessoaUsecase.execute(pedido.id_pessoa);
    const numeroNota = pedido.id;
    const filePath = 'nota_fiscal' + numeroNota + '.pdf';

    doc.fontSize(18).text('Nota Fiscal', { align: 'center' });
    doc.text('-----------------------------------------------------------');
    doc.moveDown();
    doc.fontSize(12).text(`Número: ${numeroNota}`);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Comprador: ${pessoa.nome}`);
    doc.text(`Documento: ${pessoa.documento}`);
    doc.text(`Endereço: `);
    doc.text(`Bairro: ${pessoa.endereco[0].bairro}`);
    doc.text(`Numero: ${pessoa.endereco[0].numero}`);
    doc.text(`Cidade: ${pessoa.endereco[0].cidade}`);
    doc.text(`Cep: ${pessoa.endereco[0].cep}`);
    doc.moveDown();
    doc.text(`Vendedor: ${DadoEmpresa.nome}`);
    doc.text(`CNPJ: ${DadoEmpresa.cnpj}`);
    doc.text(`Endereço: ${DadoEmpresa.endereco}`);
    doc.moveDown();

    doc.fontSize(18).text('Produtos', { align: 'center' });
    doc.text('-----------------------------------------------------------');
    for (const produto of produtos) {
      doc.fontSize(12).text(`Nome: ${produto.nome}`);
      doc.text(`Valor: R$ ${produto.valor}`);
      doc.text(`Quantidade: ${produto.quantidade}`);
      doc.moveDown();
    }
    doc.fontSize(18).text(`Total: R$ ${pedido.total}`);
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
