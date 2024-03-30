import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  //Sets schema property as optional in swagger doc
  //@ApiProperty({required: false})
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @ApiProperty({ required: false, nullable: true })
  @Matches(
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
    { message: 'incorrect email format' },
  )
  email: string;
}
