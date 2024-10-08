import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  note: string;

  @ApiProperty()
  @IsUUID()
  typeId: string;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsUUID()
  beneficiaryId: string;

  @ApiProperty()
  @IsUUID()
  currencyId: string;

  @ApiProperty()
  @IsUUID()
  storeId: string;

  @ApiProperty()
  @IsUUID()
  tableId: string;

  @ApiProperty({ required: false })
  tagIds?: string[];
}
