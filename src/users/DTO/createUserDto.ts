import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from 'src/enums/role.enum';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(8, 30)
  password: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsAlpha()
  @Length(2, 25)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsAlpha()
  @Length(2, 25)
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEnum(Roles)
  role: Roles;
}
