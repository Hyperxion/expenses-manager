import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  description: string;
}
