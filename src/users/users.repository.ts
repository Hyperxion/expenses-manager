import { Repository } from 'typeorm';
import { User } from "./user.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<User> {
    async getUsers() {
        const users = await this.createQueryBuilder("users")
        .where("user.id = :id", { id: 1 })
        .getOne();
        //const users = await query.getMany();
        console.log('running users.repository.getUsers()');
        return users;
    }
}