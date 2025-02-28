import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Length } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  abbreviation!: string;
}
