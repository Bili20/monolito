import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './models/entities/pessoa.entity';
import { Endereco } from './models/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Endereco])],
  controllers: [],
  providers: [],
})
export class PessoaModule {}
