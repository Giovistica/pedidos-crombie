import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/createAddressDto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRespository: Repository<Address>,
  ) {}

  async createAddress(address: CreateAddressDto) {
    const addressFound = await this.getAddressByCampos(address);
    if (addressFound.length != 0) {
      return addressFound[0];
    }
    const newAddress = this.addressRespository.create(address);

    return this.addressRespository.save(newAddress);
  }
  getAddress() {
    return this.addressRespository.find();
  }
  getAddressByCampos(address: CreateAddressDto) {
    return this.addressRespository.find({
      where: {
        country: address.country,
        state: address.state,
        CP: address.CP,
        city: address.city,
        street: address.street,
        number: address.number,
        apartment: address.apartment,
      },
    });
  }

  // getAddressById(idAddress: string) {
  //   return this.addressRespository.findOne({
  //     where: { idAddress },
  //   });
  // }

  deleteAddress(idAddress: string) {
    return this.addressRespository.delete(idAddress);
  }
}
