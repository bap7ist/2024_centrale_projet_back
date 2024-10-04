import { Restaurant } from 'src/referentiels/restaurant/restaurant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // Le champ photo peut être nul
  profilePicture: string; // URL ou chemin de la photo de profil

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.users)
  @JoinTable()
  favoriteRestaurants: Restaurant[]; // Liste de restaurants préférés
}
