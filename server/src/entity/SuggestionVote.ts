
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
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

    @ManyToOne(() => User)
    public user: User;

    @Column()
    userId: number;

    @Column()
    voteSessionId: number;
  }
