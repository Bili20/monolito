import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/entities/produto.entity';
import { CadastroProdutoUseCase } from './useCases/cadastroProduto/cadastroProduto.use-case';
import { ProdutoRepo } from './repository/produtoRepo';
import { CadastroProdutoController } from './useCases/cadastroProduto/cadastroProduto.controller';
import { BuscaUmProdutoUseCase } from './useCases/buscaUmProduto/buscaUmProduto.use-case';
import { AtualizaEstoqueUseCase } from './useCases/atualizaEstoque/atualizaEstoque.use-case';
import { BuscaProdutosUseCase } from './useCases/buscaProdutos/buscaProdutos.use-case';
import { BuscaProdutosController } from './useCases/buscaProdutos/buscaProdutos.controller';
import { BuscaUmProdutoController } from './useCases/buscaUmProduto/buscaUmProduto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [
    CadastroProdutoController,
    BuscaProdutosController,
    BuscaUmProdutoController,
  ],
  providers: [
    BuscaUmProdutoUseCase,
    AtualizaEstoqueUseCase,
    CadastroProdutoUseCase,
    BuscaProdutosUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
  exports: [
    BuscaUmProdutoUseCase,
    BuscaProdutosUseCase,
    AtualizaEstoqueUseCase,
  ],
})
export class ProdutoModule {}
