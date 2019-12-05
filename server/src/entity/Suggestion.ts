
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
  export class Suggestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId: number;

    @Column()
    userId: number;

    @Column()
    @Length(1, 200)
    suggestion: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }