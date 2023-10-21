import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/DTO/createUserDto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    password,
    email,
    name,
    lastName,
    phoneNumber,
    role,
  }: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    return await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      lastName,
      phoneNumber,
    });
  }
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    if (user.role === 'CLIENT') {
      let validator: boolean;
      !user.client.address ? validator = false :  validator = true
      return {
        token: token,
        isValid: validator,
        type: "CLIENT",
        idClient: user.client.id
      };
    }

    if (user.role === 'LOCAL') {
      let validator: boolean;
      !user.local.address ? validator = false :  validator = true
      return {
        token: token,
        email: user.email,
        isValid: validator,
        type: "LOCAL"
      };
    }

    if (user.role === 'DELIVERY') {
      let validator: boolean;
      !user.delivery.vehicle ? validator = false :  validator = true
      return {
        token: token,
        email: user.email,
        isValid: validator,
        type: "DELIVERY"
      };
    }
  }
}
