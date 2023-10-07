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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { direccionDto } from 'src/direccion/dto/direccionDto';
import { DireccionService } from 'src/direccion/direccion.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private direccionService: DireccionService,
  ) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    if (
      newUser.role !== 'RESTAURANT' &&
      newUser.role !== 'CLIENT' &&
      newUser.role !== 'DELIVERY'
    ) {
      throw new HttpException(
        'That role does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userFound = await this.userService.getUserByEmail(newUser);

    if (userFound) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    return this.userService.createUser(newUser);
  }
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userFound = await this.userService.getUserById(id);
    if (!userFound) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUser(id);

    if (result.affected === 0) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  @Patch('/direccion/:id')
  async updateDirección(
    @Param('id') id: string,
    @Body() direccion: direccionDto,
  ) {
    return this.userService.updateDireccion(direccion, id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    const userFound = await this.userService.getUserById(id);

    if (!userFound) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return this.userService.updateUser(id, user);
  }
}
