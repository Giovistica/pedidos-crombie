import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.userRespository.create(user);
    return this.userRespository.save(newUser);
  }
  getUsers() {
    return this.userRespository.find();
  }
  getUserByEmail(user: CreateUserDto) {
    return this.userRespository.findOne({
      where: {
        email: user.email,
      },
    });
  }
  getUserById(id: string) {
    return this.userRespository.findOne({
      where: { id },
    });
  }

  deleteUser(id: string) {
    return this.userRespository.delete(id);
  }
  updateUser(id: string, user: UpdateUserDto) {
    return this.userRespository.update({ id }, user);
  }
}
