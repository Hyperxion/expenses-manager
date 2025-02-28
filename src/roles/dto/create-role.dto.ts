import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsUUID,
} from 'class-validator';

export class CreateRoleDto {
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  description!: string;
}
