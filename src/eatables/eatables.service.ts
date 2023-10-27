import { Injectable } from '@nestjs/common';
import { Eatable } from './eatables.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEatableDto } from './dto/createEatableDto';
import { FindEatableDto } from './dto/findEatableDto';
import { LocalsService } from 'src/locals/locals.service';
import { UpdateEatableDto } from './dto/updateEatableDto';

@Injectable()
export class EatablesService {
  constructor(
    @InjectRepository(Eatable)
    private eatableRespository: Repository<Eatable>,
    private localService: LocalsService,
  ) {}

  async createEatable(eatable: CreateEatableDto, id: string) {
    const foundLocal = await this.localService.getLocalById(id);
    const newEatable = this.eatableRespository.create(eatable);
    newEatable.local = foundLocal;
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
  async getEatableByType(eatable: FindEatableDto) {
    return await this.eatableRespository.find({
      where: {
        menuType: eatable.menuType,
      },
    });
  }

  async getEatableByName(eatable: FindEatableDto) {
    return await this.eatableRespository.find({
      where: {
        name: eatable.name,
      },
    });
  }

  async getEatableByMenuType(eatable: FindEatableDto) {
    return await this.eatableRespository.find({
      where: {
        menuType: eatable.menuType,
      },
    });
  }

  async getEatableById(idEatable: string) {
    const eatable = await this.eatableRespository.findOne({
      where: { idEatable },
    });
    return eatable;
  }
  async updateEatable(id: string, eatable: UpdateEatableDto) {
    return await this.eatableRespository.update(id, eatable);
  }

  async deleteEatable(idEatable: string) {
    return await this.eatableRespository.delete(idEatable);
  }
}
