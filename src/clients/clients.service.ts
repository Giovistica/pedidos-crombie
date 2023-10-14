import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdressDto } from 'src/adress/dto/createAdressDto';
import { AdressService } from 'src/adress/adress.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRespository: Repository<Client>,
    private adressService: AdressService,
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

  async AddAdressToClient(adress: CreateAdressDto, id: string) {
    const ClientFound = await this.getClientById(id);

    if (!ClientFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    const newAdress = await this.adressService.createAdress(adress);

    ClientFound.adress = newAdress;
    return this.clientRespository.save(ClientFound);
  }
}
