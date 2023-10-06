import { Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/updateClientDto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRespository: Repository<Client>,
  ) {}

  createClient() {
    const newClient = this.clientRespository.create();
    return this.clientRespository.save(newClient);
  }
  getClients() {
    return this.clientRespository.find();
  }

  getClientById(id: string) {
    return this.clientRespository.findOne({
      where: { id },
    });
  }

  deleteClient(id: string) {
    return this.clientRespository.delete(id);
  }
  updateClient(id: string, client: UpdateClientDto) {
    return this.clientRespository.update({ id }, client);
  }
}
