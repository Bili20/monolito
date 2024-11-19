import { Injectable } from '@nestjs/common';
import { IPessoaRepo } from '../models/interfaces/pessoaRepo.interface';
import { Pessoa } from '../models/entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PessoaRepo implements IPessoaRepo {
  constructor(
    @InjectRepository(Pessoa) private readonly pessoaRepo: Repository<Pessoa>,
  ) {}

  async create(param: Pessoa): Promise<Pessoa> {
    return await this.pessoaRepo.save(param);
  }

  async delete(id: number): Promise<void> {}

  async findOne(id: number): Promise<Pessoa> {
    return await this.pessoaRepo.findOne({
      where: { id: id },
      relations: { endereco: true },
    });
  }

  async update(id: number, param: Pessoa): Promise<void> {
    await this.pessoaRepo.update(id, param);
  }

  async find(): Promise<Pessoa[]> {
    return await this.pessoaRepo.find({
      relations: { endereco: true },
      take: 1000,
    });
  }
}
