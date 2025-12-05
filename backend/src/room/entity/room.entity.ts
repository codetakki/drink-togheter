import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('room-entity')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => UserEntity, (user) => user.room, {
    cascade: true,
    eager: true,
  })
  users: UserEntity[];
}
