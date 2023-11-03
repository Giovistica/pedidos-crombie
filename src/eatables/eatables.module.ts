import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eatable } from './eatables.entity';
import { EatablesService } from './eatables.service';
import { EatablesController } from './eatables.controller';
import { LocalsModule } from 'src/locals/locals.module';
import { Orders } from 'src/orders/orders.entity';
import { Local } from 'src/locals/locals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eatable, Local, Orders]), LocalsModule],
  providers: [EatablesService],
  controllers: [EatablesController],
  exports: [EatablesService],
})
export class EatablesModule {}
