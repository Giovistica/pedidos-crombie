import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createUserDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { ClientsService } from 'src/clients/clients.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { DireccionService } from 'src/direccion/direccion.service';
import { direccionDto } from 'src/direccion/dto/direccionDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
    private clientsService: ClientsService,
    private restaurantService: RestaurantsService,
    private deliveryService: DeliverysService,
    private direccionService: DireccionService,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRespository.create(user);

    if (user.role == 'CLIENT') {
      const newClient = await this.clientsService.createClient();
      newUser.client = newClient;
    }
    if (user.role == 'RESTAURANT') {
      const newRestaurant = await this.restaurantService.createRestaurant();
      newUser.restaurant = newRestaurant;
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

  async updateDireccion(direccion: direccionDto, id: string) {
    const userFound = await this.getUserById(id);

    if (!userFound) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const newDireccion = await this.direccionService.createDireccion(direccion);

    userFound.adress = newDireccion;
    return this.userRespository.save(userFound);
  }
}
