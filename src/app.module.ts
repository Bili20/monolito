import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { NotaFiscalModule } from './nota-fiscal/nota-fiscal.module';
import { typeOrmConfig } from './config/typeormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot({
      transport: {
        host: null,
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"',
      },
    }),
    PessoaModule,
    ProdutoModule,
    PedidoModule,
    NotaFiscalModule,
  ],
})
export class AppModule {}
