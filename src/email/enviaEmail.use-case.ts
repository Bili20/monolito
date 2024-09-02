import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
import { EnviaEmailDTO } from './models/dto/enviaEmail.dto';

@Injectable()
export class EnviaEmailUseCase {
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  async execute(pessoa: Pessoa, notaFiscal: EnviaEmailDTO, diretorio: any) {
    await this.mailerService.sendMail({
      to: pessoa.email,
      from: 'teste@gmail.com',
      subject: 'Monolito',
      html: `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
  </head>
  <body class="content">
    <h1>Olá, ${pessoa.nome}</h1>
    <p>
    Em anexo, enviamos o recibo referente à Nota Fiscal n.º ${notaFiscal.numero} emitida em ${notaFiscal.data_cadastro}, no valor de R$ ${notaFiscal.total}. Este documento confirma o pedido.
    </p>
  </body>
</html>
`,
      attachDataUrls: true,
      attachments: [
        {
          filename: `nota_${notaFiscal.numero}.pdf`,
          path: diretorio,
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
