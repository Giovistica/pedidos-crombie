import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { UpdateOrderStatusDto } from './dto/updeteOrderDto';
import { ClientsService } from 'src/clients/clients.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { UpdateOrderDeliveryDto } from './dto/updateOrderDeliveryDto';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';
import { PaymentsService } from 'src/payments/payments.service';
import { findCityDto } from 'src/address/dto/findCityDto';
import { AddressService } from 'src/address/address.service';
import { LocalsService } from 'src/locals/locals.service';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRespository: Repository<Orders>,
    private clientService: ClientsService,
    private localService: LocalsService,
    private addressService: AddressService,
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
  async updateOrderAdress(order: Orders, adress: CreateAddressDto) {
    const newAdress = await this.addressService.createAddress(adress);
    order.address = newAdress;
    return this.orderRespository.save(order);
  }

  async updateOrderDelivery(order: Orders, delivery: UpdateOrderDeliveryDto) {
    const deliveryFound = await this.deliveryService.getDeliveryById(
      delivery.idDelivery,
    );
    order.delivery = deliveryFound;
    return this.orderRespository.save(order);
  }

  async updateOrderStatus(id: string, status: UpdateOrderStatusDto) {
    return await this.orderRespository.update({ id }, status);
  }
  async orderEatableAdd(order: Orders, idEatable: string) {
    const eatableFound: Eatable =
      await this.eatableService.getEatableById(idEatable);

    order.menuList.push(eatableFound);

    order.totalPrice = this.calculatedPrice(order);
    const newOrder = this.orderRespository.save(order);
    return newOrder;
  }
  async orderEatableRemove(order: Orders, idEatable: string) {
    const eatableFound: Eatable =
      await this.eatableService.getEatableById(idEatable);

    order.menuList = order.menuList.filter(
      (eatable) => eatable.idEatable !== eatableFound.idEatable,
    );

    order.totalPrice = this.calculatedPrice(order);
    const newOrder = this.orderRespository.save(order);
    return newOrder;
  }

  calculatedPrice(order: Orders) {
    let totalPrice = 0;
    order.menuList.forEach((eatable) => {
      totalPrice += eatable.price;
    });
    return totalPrice;
  }
  async getOrdersOnPrep(city: findCityDto) {
    const orders = await this.orderRespository.find({
      where: { status: Status.prep },
    });

    const result = orders.filter(
      (order) =>
        order.address.city == city.city &&
        order.address.country == city.country &&
        order.address.state == city.state,
    );
    return result;
  }
}
