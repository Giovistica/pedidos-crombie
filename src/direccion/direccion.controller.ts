import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { direccionDto } from './dto/direccionDto';

@Controller('direccion')
export class DireccionController {
  constructor(private direccionService: DireccionService) {}

  @Post() //no valida que todos los campos sean unicos
  async createDireccion(@Body() newDireccion: direccionDto) {
    return this.direccionService.createDireccion(newDireccion);
  }
  @Get(':id')
  async getDireccionById(@Param('id') id: string) {
    const direccionFound = await this.direccionService.getDireccionById(id);
    if (!direccionFound) {
      throw new HttpException('Direccion does not exist', HttpStatus.NOT_FOUND);
    }
    return direccionFound;
  }

  @Get('')
  async getDireccionByCampos(@Query() direccion: direccionDto) {
    const direccionFound =
      await this.direccionService.getDireccionByCampos(direccion);
    if (direccionFound.length == 0) {
      throw new HttpException('Direccion does not exist', HttpStatus.NOT_FOUND);
    }
    return direccionFound;
  }

  @Get()
  getAllDirecciones() {
    return this.direccionService.getDirecciones();
  }

  @Delete(':id')
  async deleteDireccion(@Param('id') id: string) {
    const result = await this.direccionService.deleteDireccion(id);

    if (result.affected === 0) {
      throw new HttpException('Direccion does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
