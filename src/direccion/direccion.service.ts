import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './direccion.entity';
import { Repository } from 'typeorm';
import { direccionDto } from './dto/direccionDto';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRespository: Repository<Direccion>,
  ) {}

  async createDireccion(direccion: direccionDto) {
    //cuando la direccion ya existia no te lo dice
    const direccionFound = await this.getDireccionByCampos(direccion);
    if (direccionFound.length != 0) {
      return direccionFound[0];
    }
    const newDireccion = this.direccionRespository.create(direccion);

    return this.direccionRespository.save(newDireccion);
  }
  getDirecciones() {
    return this.direccionRespository.find();
  }
  getDireccionByCampos(direccion: direccionDto) {
    return this.direccionRespository.find({
      where: {
        country: direccion.country,
        state: direccion.state,
        CP: direccion.CP,
        city: direccion.city,
        street: direccion.street,
        number: direccion.number,
        apartment: direccion.apartment,
      },
    });


  }


  getDireccionById(idDireccion: string) {
    return this.direccionRespository.findOne({
      where: { idDireccion },
    });
  }

  deleteDireccion(idDireccion: string) {
    return this.direccionRespository.delete(idDireccion);
  }
}
