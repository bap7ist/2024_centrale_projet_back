import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    return this.usersRepository.findOne({ where: { id } });
  }

  async findProfile(token: string): Promise<User> {
    const decoded = this.jwtService.decode(token) as any; // Decodez le token pour obtenir les informations de l'utilisateur
    const userId = decoded?.sub; // 'sub' est l'ID de l'utilisateur dans le payload
    return this.findById(userId); // Récupérez l'utilisateur par ID
  }
}
