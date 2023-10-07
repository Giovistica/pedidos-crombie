import { IsNotEmpty } from 'class-validator';

export class direccionDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  CP: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: string;

  apartment: string;
}
