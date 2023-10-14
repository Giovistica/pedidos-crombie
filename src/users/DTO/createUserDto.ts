export class CreateUserDto {
  password: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  role: 'CLIENT' | 'DELIVERY' | 'LOCAL';
}
