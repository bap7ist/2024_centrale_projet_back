import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Partial<User>): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@Req() request: any): Promise<User> {
    const token = request.headers.authorization?.split(' ')[1]; // Récupérer le token du header
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findProfile(token); // Récupérez le profil utilisateur
  }
}
