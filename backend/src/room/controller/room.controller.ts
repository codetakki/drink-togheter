import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entity/room.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Controller('room')
export class RoomController {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Create some resource
   */
  @Get()
  async getRooms(): Promise<RoomEntity[]> {
    return await this.roomRepository.find();
  }

  @Get(':code')
  async getRoom(@Param() params: { code: string }): Promise<RoomEntity | null> {
    if (!params.code) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    return await this.roomRepository.findOneBy({
      code: params.code,
    });
  }
  @Post('/create')
  async createNewRoom(): Promise<RoomEntity> {
    const randomCode = generateRandomCode();
    const createdRoom = this.roomRepository.create({
      code: randomCode,
      name: 'New room',
    });
    return this.roomRepository.save(createdRoom);
  }

  @Post(':code/add-player')
  async addPlayer(
    @Body() player: UserEntity,
    @Param() params: { code: string },
  ): Promise<RoomEntity> {
    if (!params.code) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    if (!player) {
      console.log('No player');
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const newPlayer = this.userRepository.create({
      ...player,
    });
    const room = await this.getRoom(params);
    if (!room) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    if (!room.users) {
      room.users = [];
    }
    room.users.push(newPlayer);

    const newRoom = await this.roomRepository.save(room);
    console.log(newRoom);
    return newRoom;
  }

  @Put(':code')
  async updateRoom(
    @Param() params: { code: string },
    @Body() updatedRoom: RoomEntity,
  ) {
    if (!params.code) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const currentRoom = await this.getRoom(params);
    if (!currentRoom) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    await this.roomRepository.update(currentRoom.id, {
      ...currentRoom,
      ...updatedRoom,
    });
    return;
  }
}

function generateRandomCode(length: number = 6): string {
  // 1. Define the pool of characters: all letters (case-sensitive) and digits
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789';

  // 2. Initialize an array to hold the chosen characters
  const codeArray: string[] = [];

  // 3. Loop 'length' times to select characters
  for (let i = 0; i < length; i++) {
    // Generate a random index within the bounds of the 'characters' string
    const randomIndex: number = Math.floor(Math.random() * characters.length);

    // Append the character at the random index to the array
    codeArray.push(characters.charAt(randomIndex));
  }

  // 4. Join the array of characters into a single string
  return codeArray.join('');
}
