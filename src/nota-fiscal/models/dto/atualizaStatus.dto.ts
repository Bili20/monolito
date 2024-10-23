import { BadRequestException } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { StatusEnum } from 'src/enum/status.enum';

export class AtualizaStatusDto {
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
