import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Auth([Roles.CLIENT])
@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Auth([Roles.ADMIN])
  @Post()
  createClient() {
    return this.clientService.createClient();
  }
  @Auth([Roles.ADMIN])
  @Get()
  getAllClients() {
    return this.clientService.getClients();
  }

  @Get(':id')
  async getClient(@Param('id', new ParseUUIDPipe()) id: string) {
    const clientFound = await this.clientService.getClientById(id);
    if (!clientFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return clientFound;
  }
  @Auth([Roles.ADMIN])
  @Delete(':id')
  async deleteClient(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.clientService.deleteClient(id);

    if (result.affected === 0) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id/adress')
  async addAdressToClient(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() adress: CreateAddressDto,
  ) {
    return this.clientService.AddAdressToClient(adress, id);
  }
}
