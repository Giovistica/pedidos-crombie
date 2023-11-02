import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dto/createVehicleDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverysService } from 'src/deliverys/deliverys.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRespository: Repository<Vehicle>,
    private deliveryService: DeliverysService,
  ) {}

  async createVehicle(vehicle: CreateVehicleDto, id: string) {
    const newVehicle = this.vehicleRespository.create(vehicle);
    await this.vehicleRespository.save(newVehicle);
    const deliveryFound = await this.deliveryService.getDeliveryById(id);
    deliveryFound.vehicle = newVehicle;
    return await this.deliveryService.saveDelivery(deliveryFound);
  }
  getVehicles() {
    return this.vehicleRespository.find();
  }

  getVehicleById(id: string) {
    return this.vehicleRespository.findOne({
      where: { id },
    });
  }

  deleteVehicle(id: string) {
    return this.vehicleRespository.delete(id);
  }

  async updateVehicle(id: string, vehicle: CreateVehicleDto) {
    return await this.vehicleRespository.save(vehicle);
  }
}
