import { Injectable } from '@nestjs/common';
import { Delivery } from './deliverys.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDeliveryDto } from './dto/updateDelivey.dto';

@Injectable()
export class DeliverysService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRespository: Repository<Delivery>,
  ) {}

  createDelivery() {
    const newDelivery = this.deliveryRespository.create();
    return this.deliveryRespository.save(newDelivery);
  }
  getDeliverys() {
    return this.deliveryRespository.find();
  }

  getDeliveryById(id: string) {
    return this.deliveryRespository.findOne({
      where: { id },
    });
  }

  deleteDelivery(id: string) {
    return this.deliveryRespository.delete(id);
  }
  updateDelivery(id: string, delivery: UpdateDeliveryDto) {
    return this.deliveryRespository.update({ id }, delivery);
  }
}
