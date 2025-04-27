import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionCategoryDto } from './create-transaction-category.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateTransactionCategoryDto extends PartialType(
  CreateTransactionCategoryDto,
) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name!: string;
}
