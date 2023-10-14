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
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/createVehicleDto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private VehicleService: VehiclesService) {}
  @Post(':id')
  createVehicle(@Param('id') id: string, @Query() vehicle: CreateVehicleDto) {
    return this.VehicleService.createVehicle(vehicle, id);
  }
  @Get()
  getAllVehicles() {
    return this.VehicleService.getVehicles();
  }

  @Get(':id')
  async getVehicle(@Param('id') id: string) {
    const VehicleFound = await this.VehicleService.getVehicleById(id);
    if (!VehicleFound) {
      throw new HttpException('Vehicle does not exist', HttpStatus.NOT_FOUND);
    }
    return VehicleFound;
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    const result = await this.VehicleService.deleteVehicle(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() vehicle: CreateVehicleDto,
  ) {
    const orderFound = await this.VehicleService.getVehicleById(id);

    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.VehicleService.updateVehicle(id, vehicle);
  }
}
