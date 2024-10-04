import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { Restaurant } from 'src/referentiels/restaurant/restaurant.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private jwtService: JwtService,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    // Hasher le mot de passe avant de sauvegarder l'utilisateur
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['favoriteRestaurants', 'favoriteRestaurants.avis'],
    });
  }

  async findProfile(token: string): Promise<User> {
    const decoded = this.jwtService.decode(token) as any; // Decodez le token pour obtenir les informations de l'utilisateur
    const userId = decoded?.sub; // 'sub' est l'ID de l'utilisateur dans le payload
    return this.findById(userId); // Récupérez l'utilisateur par ID
  }
  async updateProfile(token: string, updateUserDto: UserDto): Promise<User> {
    const user = await this.findProfile(token);

    if (updateUserDto.favoriteRestaurants) {
      // Récupérer les restaurants existants en base
      const restaurantIds = updateUserDto.favoriteRestaurants.map(
        (restaurant) => restaurant.id,
      );
      const existingRestaurants =
        await this.restaurantRepository.findByIds(restaurantIds);

      // Ajouter les restaurants existants au profil de l'utilisateur
      user.favoriteRestaurants = existingRestaurants;
    }

    // Mettre à jour les autres champs du profil si nécessaire
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }
}
