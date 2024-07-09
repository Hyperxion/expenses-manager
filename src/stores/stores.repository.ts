import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../GenericRepository';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from '../users/entities/user.entity';
import { processError } from '../constants';

@Injectable()
export class StoresRepository extends BaseRepository<Store> {
  constructor(dataSource: DataSource) {
    super(Store, dataSource);
  }

  async createStore(createStoreDto: CreateStoreDto) {
    try {
      const store = this.create(createStoreDto);
      const user = new User();
      user.id = createStoreDto.userId;

      store.user = user;
      await this.save(store);

      return store;
    } catch (error) {
      processError(error, Store.name);
    }
  }
}
