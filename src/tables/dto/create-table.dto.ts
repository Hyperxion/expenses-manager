import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsUUID } from 'class-validator';

export class CreateTableDto {
  @IsUUID()
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

  user!: { id: string };
}
