import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTransactionCategoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  userId: string;
}
