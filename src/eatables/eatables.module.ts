import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eatable } from './eatables.entity';

@Module({ imports: [TypeOrmModule.forFeature([Eatable])] })
export class EatablesModule {}
