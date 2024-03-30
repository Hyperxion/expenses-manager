import { CrudValidationGroups } from '@dataui/crud';
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

const { CREATE, UPDATE } = CrudValidationGroups;

export class RegisterUserDto {
  @IsOptional({ groups: [CREATE] })
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  //Sets schema property as optional in swagger doc
  //@ApiProperty({required: false})
  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Matches(
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
    { message: 'incorrect email format' },
  )
  email: string;
}
