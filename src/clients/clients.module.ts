import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients.entity';

@Module({ imports: [TypeOrmModule.forFeature([Client])] })
export class ClientsModule {}
