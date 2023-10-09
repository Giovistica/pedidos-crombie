import { Injectable } from '@nestjs/common';
import { Eatable } from './eatables.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEatableDto } from './dto/createEatableDto';
import { FindEatableDto } from './dto/findEatableDto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class EatablesService {
  constructor(
    @InjectRepository(Eatable)
    private eatableRespository: Repository<Eatable>,
    private restaurantService: RestaurantsService,
  ) {}

  async createEatable(eatable: CreateEatableDto, id: string) {
    const foundRestaurant = await this.restaurantService.getRestaurantById(id);
    const newEatable = this.eatableRespository.create(eatable);
    newEatable.restaurant = foundRestaurant;
    return await this.eatableRespository.save(newEatable);
  }
  //   async createEatable2(eatable: CreateEatableDto, restaurant: Restaurant) {
  //     const newEatable = this.eatableRespository.create(eatable);
  //     newEatable.restaurant = restaurant;
  //     return await this.eatableRespository.save(newEatable);
  //   }
  getEatables() {
    return this.eatableRespository.find();
  }
  getEatableByType(eatable: FindEatableDto) {
    return this.eatableRespository.find({
      where: {
        type: eatable.type,
      },
    });
  }

  getEatableByName(eatable: FindEatableDto) {
    return this.eatableRespository.find({
      where: {
        name: eatable.name,
      },
    });
  }

  getEatableByMenuType(eatable: FindEatableDto) {
    return this.eatableRespository.find({
      where: {
        menuType: eatable.menuType,
      },
    });
  }

  getEatableById(idEatable: string) {
    return this.eatableRespository.findOne({
      where: { idEatable },
    });
  }

  deleteEatable(idEatable: string) {
    return this.eatableRespository.delete(idEatable);
  }
}
