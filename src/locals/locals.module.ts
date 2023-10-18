import { Module } from '@nestjs/common';
import { Local } from './locals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';
import { Address } from 'src/address/address.entity';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Local, Eatable, Address, ProfileReviews]),
  ],
  providers: [
    LocalsService,
    EatablesService,
    AddressService,
    ProfileReviewsService,
  ],
  controllers: [LocalsController],
  exports: [LocalsService],
})
export class LocalsModule {}
