import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTableDto {
  @ApiProperty()
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
