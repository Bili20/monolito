import { Injectable } from '@nestjs/common';
import { IEnderecoRepo } from '../models/interfaces/enderecorepo.interface';
import { Endereco } from '../models/entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnderecoRepo implements IEnderecoRepo {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepo: Repository<Endereco>,
  ) {}
  async create(param: Endereco): Promise<Endereco> {
    return this.enderecoRepo.save(param);
  }

  async findEnderecosPessoa(id_pessoa: number): Promise<Endereco[]> {
    return await this.enderecoRepo.find({ where: { id_pessoa: id_pessoa } });
  }

  async findOneEnderecoPrincipalPessoa(id_pessoa: number): Promise<Endereco> {
    return await this.enderecoRepo.findOne({
      where: { id_pessoa: id_pessoa, principal: true },
    });
  }

  async update(id: number, param: Endereco): Promise<void> {
    await this.enderecoRepo.update(id, param);
  }
}
