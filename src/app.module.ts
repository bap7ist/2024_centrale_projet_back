import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ReferentielModule } from './referentiels/referentiel.module';
import { Avis, Restaurant } from './referentiels/restaurant/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'azerty',
      database: 'uber_eats',
      entities: [User, Restaurant, Avis],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ReferentielModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
