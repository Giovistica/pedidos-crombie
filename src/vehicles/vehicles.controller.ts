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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/createVehicleDto';
import { Roles } from 'src/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Auth([Roles.DELIVERY])
@Controller('vehicles')
export class VehiclesController {
  constructor(private VehicleService: VehiclesService) {}

  @Post(':id')
  createVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() vehicle: CreateVehicleDto,
  ) {
    return this.VehicleService.createVehicle(vehicle, id);
  }
  @Auth([Roles.ADMIN])
  @Get()
  getAllVehicles() {
    return this.VehicleService.getVehicles();
  }

  @Get(':id')
  async getVehicle(@Param('id', new ParseUUIDPipe()) id: string) {
    const VehicleFound = await this.VehicleService.getVehicleById(id);
    if (!VehicleFound) {
      throw new HttpException('Vehicle does not exist', HttpStatus.NOT_FOUND);
    }
    return VehicleFound;
  }

  @Delete(':id')
  async deleteVehicle(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.VehicleService.deleteVehicle(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() vehicle: CreateVehicleDto,
  ) {
    const vehicleFound = await this.VehicleService.getVehicleById(id);

    if (!vehicleFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.VehicleService.updateVehicle(id, vehicle);
  }
}
