import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from 'src/dto/user.dto';
import { UserMapper } from 'src/mappers/user.mapper';

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
  async getProfile(@Req() request: any): Promise<UserDto> {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.usersService.findProfile(token);
    console.log('User:', user);
    return UserMapper.mapToUserDto(user);
  }

  @Patch('update')
  async updateProfile(
    @Req() request: any,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto> {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const userResponse = await this.usersService.updateProfile(
      token,
      updateUserDto,
    );

    return UserMapper.mapToUserDto(userResponse);
  }
}
