import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateBeneficiaryDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  accountNumber?: string;

  userId!: string;
}
