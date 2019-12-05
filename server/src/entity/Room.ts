
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
    ManyToOne
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
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
    
    
    @ManyToOne(type => Group)
    public group: Group;
  }