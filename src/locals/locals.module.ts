import { Module } from '@nestjs/common';
import { Local } from './locals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';
import { AdressService } from 'src/adress/adress.service';
import { Adress } from 'src/adress/adress.entity';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Eatable, Adress, ProfileReviews])],
  providers: [
    LocalsService,
    EatablesService,
    AdressService,
    ProfileReviewsService,
  ],
  controllers: [LocalsController],
  exports: [LocalsService],
})
export class LocalsModule {}
