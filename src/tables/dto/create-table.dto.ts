import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTableDto {
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  description!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  parentTableId?: string; // ID of the parent table (optional)

  user!: { id: string };
}
