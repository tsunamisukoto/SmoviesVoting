
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn  } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
  export class GroupMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupId: number;

    @Column()
    userId: number;

    @Column()
    @IsNotEmpty()
    @Length(1, 200)
    message: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
