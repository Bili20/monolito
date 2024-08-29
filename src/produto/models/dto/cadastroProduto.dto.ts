import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CadastroProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  valor: number;

  @IsNumber()
  @IsOptional()
  qtd_estoque: number;
}
