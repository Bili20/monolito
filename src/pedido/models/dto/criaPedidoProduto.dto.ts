import { IsArray, IsNumber } from 'class-validator';

export class CriaPedidoProdutoDTO {
  @IsNumber()
  id_pedido: number;

  @IsArray()
  id_produtos: number[];
}
