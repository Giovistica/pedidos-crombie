import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/updeteOrderDto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRespository: Repository<Order>,
  ) {}

  createOrder() {
    const newOrder = this.orderRespository.create();
    return this.orderRespository.save(newOrder);
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
  updateOrder(id: string, order: UpdateOrderDto) {
    return this.orderRespository.update({ id }, order);
  }
}
