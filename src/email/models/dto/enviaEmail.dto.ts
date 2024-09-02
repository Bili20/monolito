import { IsNumber, IsString } from 'class-validator';

export class EnviaEmailDTO {
  @IsNumber()
  numero: number;

  @IsString()
  data_cadastro: string;

  @IsNumber()
  total: number;
}
