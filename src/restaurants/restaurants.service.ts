import { Injectable } from '@nestjs/common';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { Restaurant } from './restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRespository: Repository<Restaurant>,
  ) {}

  createRestaurant() {
    const newRestaurant = this.restaurantRespository.create();
    return this.restaurantRespository.save(newRestaurant);
  }
  getRestaurant() {
    return this.restaurantRespository.find();
  }

  async getRestaurantById(id: string) {
    const restaurant = await this.restaurantRespository.findOne({
      where: { id },
    });
    return restaurant;
  }

  deleteRestaurant(id: string) {
    return this.restaurantRespository.delete(id);
  }
  updateRestaurant(id: string, restaurant: UpdateRestaurantDto) {
    return this.restaurantRespository.update({ id }, restaurant);
  }
}