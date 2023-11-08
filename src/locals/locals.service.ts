import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { UpdateLocalDto } from './dto/updateLocalDto';
import { findCityDto } from 'src/address/dto/findCityDto';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localRespository: Repository<Local>,
    private adressService: AddressService,
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
      .filter((local) => local.address !== null)
      .filter((local) => local.address.city === city.city)
      .filter((local) => local.address.state === city.state)
      .filter((local) => local.address.country === city.country);

    return localsByAdress;
  }
  async AddAdressToLocal(adress: CreateAddressDto, id: string) {
    const localFound = await this.getLocalById(id);

    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    const newAdress = await this.adressService.createAddress(adress);

    localFound.address = newAdress;
    return this.localRespository.save(localFound);
  }

  async getOrdersByLocal(id: string) {
    const local = await this.localRespository
      .createQueryBuilder('local')
      .leftJoinAndSelect('local.ordersHistory', 'orders')
      .where('local.id = :localId', { localId: id })
      .getOne();

    if (local) {
      return local.ordersHistory;
    }

    return [];
  }
}
