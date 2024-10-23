import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProdutosQuantidadeDTO } from './produtosQuatidade.dto';
import { StatusEnum } from 'src/enum/status.enum';

export class CriaPedidoDto {
  @IsNumber()
  id_pessoa: number;

  @IsArray()
  produtos: ProdutosQuantidadeDTO[];

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum = StatusEnum.AGUARDANDO;

  @IsString()
  @IsOptional()
  data_atualizacao: Date;
}
