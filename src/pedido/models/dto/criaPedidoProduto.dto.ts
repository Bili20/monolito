import { IsArray, IsNumber } from 'class-validator';
import { ProdutosNotaDTO } from 'src/nota-fiscal/models/dto/produtosNota.dto';
import { Produto } from 'src/produto/models/entities/produto.entity';

export class CriaPedidoProdutoDTO {
  @IsNumber()
  id_pedido: number;

  @IsArray()
  produtos: ProdutosNotaDTO[];
}
