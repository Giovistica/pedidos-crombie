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
import { EatablesService } from './eatables.service';
import { CreateEatableDto } from './dto/createEatableDto';
import { UpdateEatableDto } from './dto/updateEatableDto';

@Controller('eatables')
export class EatablesController {
  constructor(private eatableService: EatablesService) {}

  @Post(':id')
  async createEatables(
    @Param('id') id: string,
    @Body() newEatable: CreateEatableDto,
  ) {
    return this.eatableService.createEatable(newEatable, id);
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
  async deleteEatable(@Param('id') id: string) {
    const result = await this.eatableService.deleteEatable(id);

    if (result.affected === 0) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() eatable: UpdateEatableDto,
  ) {
    const eatableFound = await this.eatableService.getEatableById(id);

    if (!eatableFound) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return this.eatableService.updateEatable(id, eatable);
  }
}
