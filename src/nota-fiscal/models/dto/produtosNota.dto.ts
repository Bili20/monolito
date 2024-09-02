import { IsNumber, IsString } from 'class-validator';

export class ProdutosNotaDTO {
  @IsNumber()
  id: number;

  @IsString()
  nome: string;

  @IsNumber()
  valor: number;

  @IsNumber()
  quantidade: number;
}
