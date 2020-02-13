
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Room } from './Room';

@Entity()
@Unique(['name'])
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  name: string;

  @Column()
  @Length(0, 255)
  shortDescription: string;

  @Column()
  @Length(0, 5000)
  description: string;

  @Column()
  createdUserId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => User, user => user.groups)
  users: User[];

  rooms: Room[];

}
