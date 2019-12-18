
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
  export class SuggestionVote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    suggestionId: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(type => User)
    public user: User;

    @Column()
    userId: number;

    @Column()
    voteSessionId: number;
  }