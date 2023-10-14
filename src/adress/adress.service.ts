import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './adress.entity';
import { CreateAdressDto } from './dto/createAdressDto';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private adressRespository: Repository<Adress>,
  ) {}

  async createAdress(adress: CreateAdressDto) {
    const adressFound = await this.getAdressByCampos(adress);
    if (adressFound.length != 0) {
      return adressFound[0];
    }
    const newAdress = this.adressRespository.create(adress);

    return this.adressRespository.save(newAdress);
  }
  getAdress() {
    return this.adressRespository.find();
  }
  getAdressByCampos(adress: CreateAdressDto) {
    return this.adressRespository.find({
      where: {
        country: adress.country,
        state: adress.state,
        CP: adress.CP,
        city: adress.city,
        street: adress.street,
        number: adress.number,
        apartment: adress.apartment,
      },
    });
  }

  getAdressById(idAdress: string) {
    return this.adressRespository.findOne({
      where: { idAdress },
    });
  }

  deleteAdress(idAdress: string) {
    return this.adressRespository.delete(idAdress);
  }
}
