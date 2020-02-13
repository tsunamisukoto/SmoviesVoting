
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Length } from 'class-validator';
import { Group } from './Group';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  @Length(4, 20)
  name: string;

  @Column()
  @Length(4, 255)
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdUserId: number;

  @ManyToOne(() => Group)
  public group: Group;
}
