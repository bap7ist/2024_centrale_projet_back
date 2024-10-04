import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  adresse: string;

  @OneToMany(() => Avis, (avis) => avis.restaurant, { cascade: true })
  avis: Avis[];

  @ManyToMany(() => User, (user) => user.favoriteRestaurants)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('avis')
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  user: string;

  @Column('text')
  com: string;

  @Column({ type: 'int', default: 0 })
  note: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.avis)
  restaurant: Restaurant;
}
