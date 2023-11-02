import { Injectable } from '@nestjs/common';
import { Delivery } from './deliverys.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Injectable()
export class DeliverysService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRespository: Repository<Delivery>,
    private profileReviewsService: ProfileReviewsService,
  ) {}

  async createDelivery() {
    const newDelivery = this.deliveryRespository.create();
    const newProfile = await this.profileReviewsService.createProfileReviews();
    newDelivery.profileReviews = newProfile;
    return await this.deliveryRespository.save(newDelivery);
  }
  getDeliverys() {
    return this.deliveryRespository.find();
  }

  async getDeliveryById(id: string) {
    return await this.deliveryRespository.findOne({
      where: { id },
    });
  }
  async saveDelivery(delivery: Delivery) {
    return await this.deliveryRespository.save(delivery);
  }

  deleteDelivery(id: string) {
    return this.deliveryRespository.delete(id);
  }
}
