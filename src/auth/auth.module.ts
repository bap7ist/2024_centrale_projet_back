import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/users.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import {
  Avis,
  Restaurant,
} from 'src/referentiels/restaurant/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Restaurant, Avis]), // Assurez-vous d'importer votre entité User
    JwtModule.register({
      secret: 'your_secret_key', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '60s' }, // Optionnel : temps d'expiration du token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
