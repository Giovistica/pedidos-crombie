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

    return this.mapUserDto(newUser);
  }
  async getUsers() {
    const users = await this.userRespository.find();
    const dtos = [];
    users.forEach((element) => {
      dtos.push(this.mapUserDto(element));
    });
    return dtos;
  }
  getUserByEmail(email: string) {
    return this.userRespository.findOneBy({
      email,
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
    const dto = new UserCreatedDto();

    dto.email = user.email;
    dto.lastName = user.lastName;
    dto.name = user.name;
    dto.phoneNumber = user.phoneNumber;
    dto.createdAt = user.createdAt;

    if (user.role == Roles.CLIENT) {
      dto.role = Roles.CLIENT;
      dto.clientID = user.client.id;
    }
    if (user.role == Roles.DELIVERY) {
      dto.role = Roles.DELIVERY;
      dto.deliveryID = user.delivery.id;
    }
    if (user.role == Roles.LOCAL) {
      dto.role = Roles.LOCAL;
      dto.localID = user.local.id;
    }
    console.log(dto);
    return dto;
  }
}
