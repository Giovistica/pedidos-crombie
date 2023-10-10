import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/updeteOrderDto';
import { ClientsService } from 'src/clients/clients.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { direccionDto } from 'src/direccion/dto/direccionDto';
import { DireccionService } from 'src/direccion/direccion.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRespository: Repository<Order>,
    private clientService: ClientsService,
    private restaurantService: RestaurantsService,
    private direccionService: DireccionService,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const foundClient = await this.clientService.getClientById(order.clientId);
    const foundRestaurant = await this.restaurantService.getRestaurantById(
      order.restaurantId,
    );
    const newOrder = this.orderRespository.create();
    newOrder.client = foundClient;
    newOrder.restaurant = foundRestaurant;
    return await this.orderRespository.save(newOrder);
  }
  getOrders() {
    return this.orderRespository.find();
  }

  getOrderById(id: string) {
    return this.orderRespository.findOne({
      where: { id },
    });
  }

  deleteOrder(id: string) {
    return this.orderRespository.delete(id);
  }
  async updateOrderDireccion(order: Order, direccion: direccionDto) {
    const newDireccion = await this.direccionService.createDireccion(direccion);
    order.adress = newDireccion;
    return this.orderRespository.save(order);
  }

  updateOrder(id: string, order: UpdateOrderDto) {
    return this.orderRespository.update({ id }, order);
  }
}
