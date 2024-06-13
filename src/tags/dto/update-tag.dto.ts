import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;
}
