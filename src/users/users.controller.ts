import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Auth(Roles.ADMIN)
  @Post()
  async createUser(@Body() newUser: CreateUserDto, @Res() response: Response) {
    const userFound = await this.userService.getUserByEmail(newUser.email);

    if (userFound) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const user = await this.userService.createUser(newUser);
    return response.status(201).json(user);
  }
  @Get()
  @Auth(Roles.ADMIN)
  getAllUsers() {
    return this.userService.getUsers();
  }
  @Auth(Roles.ADMIN)
  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const userFound = await this.userService.getUserById(id);
    if (!userFound) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }
  @Auth(Roles.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.deleteUser(id);

    if (result.affected === 0) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  @Auth(Roles.LOCAL)
  @Auth(Roles.DELIVERY)
  @Auth(Roles.CLIENT)
  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: UpdateUserDto,
  ) {
    const userFound = await this.userService.getUserById(id);

    if (!userFound) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return this.userService.updateUser(id, user);
  }
}
