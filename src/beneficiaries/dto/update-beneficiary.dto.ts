import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBeneficiaryDto } from './create-beneficiary.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateBeneficiaryDto extends PartialType(CreateBeneficiaryDto) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  accountNumber?: string;
}
