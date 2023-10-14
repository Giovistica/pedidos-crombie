import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { UpdateOrderStatusDto } from './dto/updeteOrderDto';
import { ClientsService } from 'src/clients/clients.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { UpdateOrderDeliveryDto } from './dto/updateOrderDeliveryDto';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';
import { PaymentsService } from 'src/payments/payments.service';
import { findCityDto } from 'src/adress/dto/findCityDto';
import { AdressService } from 'src/adress/adress.service';
import { LocalsService } from 'src/locals/locals.service';
import { CreateAdressDto } from 'src/adress/dto/createAdressDto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRespository: Repository<Order>,
    private clientService: ClientsService,
    private localService: LocalsService,
    private adressService: AdressService,
    private deliveryService: DeliverysService,
    private eatableService: EatablesService,
    private paymentService: PaymentsService,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const foundClient = await this.clientService.getClientById(order.clientId);
    const foundRestaurant = await this.localService.getLocalById(
      order.restaurantId,
    );
    const newOrder = this.orderRespository.create();
    const newPayment = await this.paymentService.createPayment();

    newOrder.client = foundClient;
    newOrder.local = foundRestaurant;
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
  async updateOrderAdress(order: Order, adress: CreateAdressDto) {
    const newAdress = await this.adressService.createAdress(adress);
    order.adress = newAdress;
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
  async getOrdersOnPrep(city: findCityDto) {
    const orders = await this.orderRespository.find({
      where: { status: 'PREP' },
    });

    const result = orders.filter(
      (order) =>
        order.adress.city == city.city &&
        order.adress.country == city.country &&
        order.adress.state == city.state,
    );
    return result;
  }
}
