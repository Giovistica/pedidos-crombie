import { Module } from '@nestjs/common';
import { Review } from './reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Review])] })
export class RewiesModule {}
