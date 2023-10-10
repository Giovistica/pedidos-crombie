import { Module } from '@nestjs/common';
import { Review } from './reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Client, User]),
    ClientsModule,
    UsersModule,
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class RewiesModule {}
