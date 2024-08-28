import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './models/entities/pessoa.entity';
import { Endereco } from './models/entities/endereco.entity';
import { CriaPessoaUsecase } from './useCase/criaPessoa/criaPessoa.use-case';
import { PessoaRepo } from './repository/pessoaRepo';
import { CriaEnderecoUseCase } from './useCase/criaEndereco/criaEndereco.use-case';
import { EnderecoRepo } from './repository/enderecoRepo';
import { CriapessoaController } from './useCase/criaPessoa/criaPessoa.controller';
import { BuscaUmaPessoaUsecase } from './useCase/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { AtualizaPessoaUseCase } from './useCase/atualizaPessoa/atualizaPessoa.use-case';
import { AtualizaPessoaController } from './useCase/atualizaPessoa/atualizaPessoa.controller';
import { BuscaUmEnderecoPrincipalUseCase } from './useCase/bsucaUmEnderecoPrincipal/buscaUmEnderecoPrincipal.use-case';
import { AtualizaEnderecoUseCase } from './useCase/atualizaEndereco/atualizaEndereco.use-case';
import { CriaEnderecoController } from './useCase/criaEndereco/criaEndereco.controller';
import { AtualizaEnderecoController } from './useCase/atualizaEndereco/atualizaEndereco.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Endereco])],
  controllers: [
    CriapessoaController,
    AtualizaPessoaController,
    CriaEnderecoController,
    AtualizaEnderecoController,
  ],
  providers: [
    CriaPessoaUsecase,
    BuscaUmaPessoaUsecase,
    AtualizaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    CriaEnderecoUseCase,
    BuscaUmEnderecoPrincipalUseCase,
    AtualizaEnderecoUseCase,
    EnderecoRepo,
    { provide: 'IEnderecoRepo', useExisting: EnderecoRepo },
  ],
})
export class PessoaModule {}
