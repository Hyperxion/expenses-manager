import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async findAll(){
        console.log('running users.service.findAll()');
        const users = await this.usersRepository.find();
        console.log(`users  from service are ${JSON.stringify(users)}`);
        return users
    }
}
