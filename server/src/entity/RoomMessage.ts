
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    TableForeignKey,
    OneToOne,
    JoinColumn,
    ManyToMany,
    ManyToOne
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';
  
  @Entity()
  export class RoomMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId: number;

    @Column()
    userId: number;

    @Column()
    @Length(1, 200)
    message: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(type => User)
    public user: User;
  }