import { RoomEntity } from 'src/room/entity/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weightKg: number;

  @ManyToOne(() => RoomEntity, (room) => room.users)
  room: RoomEntity;
  // @JoinColumn({ name: 'drinks' })
  // drinks: DrinkEntity[];
}
