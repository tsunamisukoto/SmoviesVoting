
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';

@Entity()
  export class UserSocialLogin {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // userId: number;

    @Column()
    @Length(1, 200)
    provider: string;

    @Column()
    @Length(1, 200)
    externalId: string;

    @Column()
    @Length(1, 200)
    authToken: string;

    // @Column()
    // @Length(1, 200)
    // idToken: string;

    // @Column()
    // @Length(1, 200)
    // authorizationCode: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    public user: User;
  }
