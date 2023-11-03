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
  Query,
} from '@nestjs/common';
import { EatablesService } from './eatables.service';
import { UpdateEatableDto } from './dto/updateEatableDto';
import { LocalsService } from 'src/locals/locals.service';
import { CreateEatableDto } from './dto/createEatableDto';
import { FindEatableDto } from './dto/findEatableDto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Controller('eatables')
export class EatablesController {
  constructor(
    private eatableService: EatablesService,
    private localService: LocalsService,
  ) {}

  @Auth([Roles.LOCAL])
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

  @Auth([Roles.LOCAL, Roles.CLIENT])
  @Get(':id')
  async getEatableById(@Param('id', new ParseUUIDPipe()) id: string) {
    const eatableFound = await this.eatableService.getEatableById(id);
    if (!eatableFound) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return eatableFound;
  }

  @Auth([Roles.CLIENT])
  @Get('')
  async getEatableByMenuType(@Query() eatable: FindEatableDto) {
    const eatableFound =
      await this.eatableService.getEatableByMenuType(eatable);
    if (eatableFound.length == 0) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return eatableFound;
  }

  @Auth([Roles.ADMIN])
  @Get()
  getAllEatables() {
    return this.eatableService.getEatables();
  }

  @Auth([Roles.LOCAL])
  @Delete(':id')
  async deleteEatable(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.eatableService.deleteEatable(id);

    if (result.affected === 0) {
      throw new HttpException('Eatable does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Auth([Roles.LOCAL])
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
