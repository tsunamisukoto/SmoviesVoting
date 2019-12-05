
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    TableForeignKey,
    OneToOne,
    JoinColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupId: number;

    @Column()
    userId: number;

    @Column()
    @Length(1, 100)
    optionName: string;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }