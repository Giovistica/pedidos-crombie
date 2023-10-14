import { IsNotEmpty } from 'class-validator';

export class CreateAdressDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;
  
  @IsNotEmpty()
  CP: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: string;

  apartment: string;
}
