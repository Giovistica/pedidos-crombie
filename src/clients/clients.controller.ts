import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/updateClientDto';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Post()
  createClient() {
    return this.clientService.createClient();
  }
  @Get()
  getAllClients() {
    return this.clientService.getClients();
  }

  @Get(':id')
  async getClient(@Param('id') id: string) {
    const clientFound = await this.clientService.getClientById(id);
    if (!clientFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return clientFound;
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    const result = await this.clientService.deleteClient(id);

    if (result.affected === 0) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateClient(@Param('id') id: string, @Body() client: UpdateClientDto) {
    const clientFound = await this.clientService.getClientById(id);

    if (!clientFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return this.clientService.updateClient(id, client);
  }
}