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
import { Roles } from 'src/enums/role.enum';

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

    if (user.role === Roles.CLIENT) {
      let validator: number;
      !user.client.address ? (validator = -1) : (validator = 1);
      return {
        token: token,
        isValid: validator,
        menuValidator: null,
        type: user.role,
        idRol: user.client.id,
      };
    }

    if (user.role === Roles.LOCAL) {
      let validator: number;
      let menuValidator: number;
      !user.local.address ? (validator = -1) : (validator = 1);
      user.local.menus.length < 3 ? (menuValidator = -1) : (menuValidator = 1);
      return {
        token: token,
        isValid: validator,
        menuValidator: menuValidator,
        type: user.role,
        idRol: user.local.id,
      };
    }

    if (user.role === Roles.DELIVERY) {
      let validator: number;
      !user.delivery.vehicle ? (validator = -1) : (validator = 1);
      return {
        token: token,
        isValid: validator,
        menuValidator: null,
        type: user.role,
        idRol: user.delivery.id,
      };
    }
  }
}
