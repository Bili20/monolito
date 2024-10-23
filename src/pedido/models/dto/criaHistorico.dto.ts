import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusEnum } from 'src/enum/status.enum';

export class CreateHistoricoDto {
  @IsNumber()
  @IsNotEmpty()
  id_pedido: number;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;
}
