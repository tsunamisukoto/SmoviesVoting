
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Group } from "./Group";
import { RoomMessage } from './RoomMessage';

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 20)
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  photoUrl: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  @ManyToMany(type => Group, group => group.users)
  groups: Group[];

  // @OneToMany(type => RoomMessage, message => message.user)
  roomMessages: RoomMessage[];
}