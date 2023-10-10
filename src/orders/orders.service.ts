import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { UpdateOrderStatusDto } from './dto/updeteOrderDto';
import { ClientsService } from 'src/clients/clients.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { direccionDto } from 'src/direccion/dto/direccionDto';
import { DireccionService } from 'src/direccion/direccion.service';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { UpdateOrderDeliveryDto } from './dto/updateOrderDeliveryDto';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRespository: Repository<Order>,
    private clientService: ClientsService,
    private restaurantService: RestaurantsService,
    private direccionService: DireccionService,
    private deliveryService: DeliverysService,
    private eatableService: EatablesService,
    private paymentService: PaymentsService,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const foundClient = await this.clientService.getClientById(order.clientId);
    const foundRestaurant = await this.restaurantService.getRestaurantById(
      order.restaurantId,
    );
    const newOrder = this.orderRespository.create();
    const newPayment = await this.paymentService.createPayment();

    newOrder.client = foundClient;
    newOrder.restaurant = foundRestaurant;
    newOrder.payment = newPayment;

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

  async updateOrderDelivery(order: Order, delivery: UpdateOrderDeliveryDto) {
    const deliveryFound = await this.deliveryService.getDeliveryById(
      delivery.idDelivery,
    );
    order.delivery = deliveryFound;
    return this.orderRespository.save(order);
  }

  async updateOrderStatus(id: string, status: UpdateOrderStatusDto) {
    return await this.orderRespository.update({ id }, status);
  }
  async orderEatableAdd(order: Order, idEatable: string) {
    const eatableFound: Eatable =
      await this.eatableService.getEatableById(idEatable);

    order.menuList.push(eatableFound);

    order.totalPrice = this.calculatedPrice(order);
    const newOrder = this.orderRespository.save(order);
    return newOrder;
  }
  async orderEatableRemove(order: Order, idEatable: string) {
    const eatableFound: Eatable =
      await this.eatableService.getEatableById(idEatable);

    order.menuList = order.menuList.filter(
      (eatable) => eatable.idEatable !== eatableFound.idEatable,
    );

    order.totalPrice = this.calculatedPrice(order);
    const newOrder = this.orderRespository.save(order);
    return newOrder;
  }

  calculatedPrice(order: Order) {
    let totalPrice = 0;
    order.menuList.forEach((eatable) => {
      totalPrice += eatable.price;
    });
    return totalPrice;
  }
}
