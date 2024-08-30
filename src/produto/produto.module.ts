import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/entities/produto.entity';
import { CadastroProdutoUseCase } from './useCases/cadastroProduto/cadastroProduto.use-case';
import { ProdutoRepo } from './repository/produtoRepo';
import { CadastroProdutoController } from './useCases/cadastroProduto/cadastroProduto.controller';
import { BuscaUmProdutoUseCase } from './useCases/buscaUmProduto/buscaUmProduto.use-case';
import { AtualizaEstoqueUseCase } from './useCases/atualizaEstoque/atualizaEstoque.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [CadastroProdutoController],
  providers: [
    BuscaUmProdutoUseCase,
    AtualizaEstoqueUseCase,
    CadastroProdutoUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
  exports: [BuscaUmProdutoUseCase, AtualizaEstoqueUseCase],
})
export class ProdutoModule {}
