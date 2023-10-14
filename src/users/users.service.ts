import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { ClientsService } from 'src/clients/clients.service';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { Repository } from 'typeorm';
import { LocalsService } from 'src/locals/locals.service';
import { AdressService } from 'src/adress/adress.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
    private clientsService: ClientsService,
    private localService: LocalsService,
    private deliveryService: DeliverysService,
    private adressService: AdressService,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRespository.create(user);

    if (user.role == 'CLIENT') {
      const newClient = await this.clientsService.createClient();
      newUser.client = newClient;
    }
    if (user.role == 'LOCAL') {
      const newLocal = await this.localService.createLocal();
      newUser.local = newLocal;
    }

    if (user.role == 'DELIVERY') {
      const newDelivery = await this.deliveryService.createDelivery();
      newUser.delivery = newDelivery;
    }

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
  async getUserByRole(role: 'CLIENT' | 'DELIVERY' | 'LOCAL') {
    return await this.userRespository.find({
      where: {
        role,
      },
    });
  }
  getUserById(userId: string) {
    return this.userRespository.findOne({
      where: { userId },
    });
  }

  deleteUser(id: string) {
    return this.userRespository.delete(id);
  }

  updateUser(userId: string, user: UpdateUserDto) {
    return this.userRespository.update({ userId }, user);
  }
}
