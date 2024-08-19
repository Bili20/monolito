import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { NotaFiscalModule } from './nota-fiscal/nota-fiscal.module';

@Module({
  imports: [PessoaModule, ProdutoModule, PedidoModule, NotaFiscalModule],
})
export class AppModule {}
