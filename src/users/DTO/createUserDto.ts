export class CreateUserDto {
  password: string;
  email: string;
  name: string;
  lastName: string;
  role: 'CLIENT' | 'DELIVERY' | 'RESTAURANT';
}
