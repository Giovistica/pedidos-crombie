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
import { EatablesService } from './eatables.service';
import { UpdateEatableDto } from './dto/updateEatableDto';
import { LocalsService } from 'src/locals/locals.service';
import { CreateEatableDto } from './dto/createEatableDto';

@Controller('eatables')
export class EatablesController {
  constructor(
    private eatableService: EatablesService,
    private localService: LocalsService,
  ) {}

  @Post(':id')
  async updateLocal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() eatable: CreateEatableDto,
  ) {
    const localFound = await this.localService.getLocalById(id);

    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return this.eatableService.createEatable(eatable, id);
  }
  @Get(':id')
  async getEatableById(@Param('id') id: string) {
    const eatableFound = await this.eatableService.getEatableById(id);
    if (!eatableFound) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return eatableFound;
  }

  // @Get('')
  // async getEatableByMenuType(@Query() eatable: FindEatableDto) {
  //   const eatableFound =
  //     await this.eatableService.getEatableByMenuType(eatable);
  //   if (eatableFound.length == 0) {
  //     throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   return eatableFound;
  // }

  @Get()
  getAllEatables() {
    return this.eatableService.getEatables();
  }

  @Delete(':id')
  async deleteEatable(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.eatableService.deleteEatable(id);

    if (result.affected === 0) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateEatable(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() eatable: UpdateEatableDto,
  ) {
    const eatableFound = await this.eatableService.getEatableById(id);
    if (!eatableFound) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return this.eatableService.updateEatable(id, eatable);
  }
}
