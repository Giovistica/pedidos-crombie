export class CreateUserDto {
  password: string;
  email: string;
  name: string;
  lastName: string;
  phoneNUmber: string;
  role: 'CLIENT' | 'DELIVERY' | 'RESTAURANT';
}
