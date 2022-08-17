import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create({
      name: createUserDto.name,
    });
    const savedUser = await this.usersRepository.save(createdUser);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    const removedUser = await this.usersRepository.remove(user);
    return removedUser;
  }
}
