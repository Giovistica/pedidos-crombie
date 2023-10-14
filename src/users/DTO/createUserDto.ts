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
  @IsString()
  @Length(8, 30)
  password: string;

  @IsEmail()
  email: string;

  @IsAlpha()
  @Length(2, 25)
  name: string;

  @IsAlpha()
  @Length(2, 25)
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEnum(Roles)
  role: Roles;
}
