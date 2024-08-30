import { IsNumber } from 'class-validator';

export class ProdutosQuantidadeDTO {
  @IsNumber()
  id_produto: number;

  @IsNumber()
  quantidade: number;
}
