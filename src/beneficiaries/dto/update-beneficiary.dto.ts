import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBeneficiaryDto } from './create-beneficiary.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateBeneficiaryDto extends PartialType(CreateBeneficiaryDto) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;
}
