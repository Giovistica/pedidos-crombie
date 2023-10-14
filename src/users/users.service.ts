import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { ClientsService } from 'src/clients/clients.service';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { Repository } from 'typeorm';
import { LocalsService } from 'src/locals/locals.service';
import { Injectable } from '@nestjs/common';
import { Roles } from 'src/enums/role.enum';
import { UserCreatedDto } from './DTO/userCreatedDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
    private clientsService: ClientsService,
    private localService: LocalsService,
    private deliveryService: DeliverysService,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRespository.create(user);

    if (user.role == Roles.CLIENT) {
      const newClient = await this.clientsService.createClient();
      newUser.client = newClient;
    }
    if (user.role == Roles.LOCAL) {
      const newLocal = await this.localService.createLocal();
      newUser.local = newLocal;
    }

    if (user.role == Roles.DELIVERY) {
      const newDelivery = await this.deliveryService.createDelivery();
      newUser.delivery = newDelivery;
    }
    this.userRespository.save(newUser);

    return await this.mapUserDto;
  }
  async getUsers() {
    const users = await this.userRespository.find();
    const dtos = users.map((element) => {
      this.mapUserDto(element);
    });
    return dtos;
  }
  getUserByEmail(user: CreateUserDto) {
    return this.userRespository.findOne({
      where: {
        email: user.email,
      },
    });
  }
  async getUserByRole(role: Roles) {
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

  mapUserDto(user: User) {
    const res = new UserCreatedDto();

    res.email = user.email;
    res.lastName = user.lastName;
    res.name = user.name;
    res.name = user.name;

    if (user.role == Roles.CLIENT) {
      res.role = Roles.CLIENT;
      res.clientID = user.client.id;
    }
    if (user.role == Roles.DELIVERY) {
      res.role = Roles.DELIVERY;
      res.clientID = user.delivery.id;
    }
    if (user.role == Roles.LOCAL) {
      res.role = Roles.LOCAL;
      res.clientID = user.local.id;
    }
    return res;
  }
}
