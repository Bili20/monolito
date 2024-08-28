import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './models/entities/pessoa.entity';
import { Endereco } from './models/entities/endereco.entity';
import { CriaPessoaUsecase } from './useCase/criaPessoa/criaPessoa.use-case';
import { PessoaRepo } from './repository/pessoaRepo';
import { CriaEnderecoUseCase } from './useCase/criaEndereco/criaEndereco.use-case';
import { EnderecoRepo } from './repository/enderecoRepo';
import { CriapessoaController } from './useCase/criaPessoa/criaPessoa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Endereco])],
  controllers: [CriapessoaController],
  providers: [
    CriaPessoaUsecase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    CriaEnderecoUseCase,
    EnderecoRepo,
    { provide: 'IEnderecoRepo', useExisting: EnderecoRepo },
  ],
})
export class PessoaModule {}
