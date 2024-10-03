import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Pessoa } from 'src/pessoa/models/entities/pessoa.entity';
@Injectable()
export class EnviaEmailUseCase {
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  async execute(pessoa: Pessoa) {
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
    Em anexo, enviamos este documento que confirma o pedido.
    </p>
  </body>
</html>
`,
    });
  }
}
