import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentielController } from './referentiel.controller';
import { ReferentielService } from './referentiel.service';
import { Avis, Restaurant } from './restaurant/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Avis])],
  controllers: [ReferentielController],
  providers: [ReferentielService],
})
export class ReferentielModule {}
