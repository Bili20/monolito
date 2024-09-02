import { IsEmail, IsObject, IsString, MinLength } from 'class-validator';
import { CriaEnderecoDTO } from './criaEndereco.dto';

export class CriaPessoaDto {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsString()
  data_nacimento: Date;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  telefone: string;

  @IsString()
  sexo: string;
}
