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
}
