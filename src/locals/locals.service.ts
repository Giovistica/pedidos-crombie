import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { UpdateLocalDto } from './dto/updateLocalDto';
import { findCityDto } from 'src/adress/dto/findCityDto';
import { AdressService } from 'src/adress/adress.service';
import { CreateAdressDto } from 'src/adress/dto/createAdressDto';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localRespository: Repository<Local>,
    private adressService: AdressService,
    private profileReviewsService: ProfileReviewsService,
  ) {}

  async createLocal() {
    const newLocal = this.localRespository.create();
    const newProfile = await this.profileReviewsService.createProfileReviews();
    newLocal.profileReviews = newProfile;
    return await this.localRespository.save(newLocal);
  }
  getLocals() {
    return this.localRespository.find();
  }

  async getLocalById(id: string) {
    const local = await this.localRespository.findOne({
      where: { id },
    });
    return local;
  }

  deleteLocal(id: string) {
    return this.localRespository.delete(id);
  }
  updateLocal(id: string, local: UpdateLocalDto) {
    return this.localRespository.update({ id }, local);
  }

  async getLocalsInCity(city: findCityDto) {
    const locals = await this.getLocals();

    const localsByAdress = locals
      .filter((local) => local.adress !== null)
      .filter((local) => local.adress.city === city.city)
      .filter((local) => local.adress.state === city.state)
      .filter((local) => local.adress.country === city.country);

    return localsByAdress;
  }
  async AddAdressToLocal(adress: CreateAdressDto, id: string) {
    const localFound = await this.getLocalById(id);

    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    const newAdress = await this.adressService.createAdress(adress);

    localFound.adress = newAdress;
    return this.localRespository.save(localFound);
  }
}
