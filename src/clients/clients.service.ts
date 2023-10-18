import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRespository: Repository<Client>,
    private adressService: AddressService,
  ) {}

  createClient() {
    const newClient = this.clientRespository.create();
    return this.clientRespository.save(newClient);
  }
  getClients() {
    return this.clientRespository.find();
  }

  async getClientById(id: string) {
    const client = await this.clientRespository.findOne({
      where: { id },
    });
    return client;
  }

  deleteClient(id: string) {
    return this.clientRespository.delete(id);
  }

  async AddAdressToClient(adress: CreateAddressDto, id: string) {
    const ClientFound = await this.getClientById(id);

    if (!ClientFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    const newAdress = await this.adressService.createAddress(adress);

    ClientFound.address = newAdress;
    return this.clientRespository.save(ClientFound);
  }
}
