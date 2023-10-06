import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './direccion.entity';

@Module({ imports: [TypeOrmModule.forFeature([Direccion])] })
export class DireccionModule {}
