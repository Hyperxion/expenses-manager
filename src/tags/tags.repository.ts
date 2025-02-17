import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Transaction } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { User } from '../users/entities/user.entity';
import { processError } from '../constants';

@Injectable()
export class TagsRepository extends BaseRepository<Tag> {
  constructor(dataSource: DataSource) {
    super(Tag, dataSource);
  }

  async createBulkTags(tags: Tag[]): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(Tag, tags);
      });
    } catch (error) {
      processError(error, Tag.name);
      throw error; // rethrow so that the transaction is rolled back
    }
  }

  async createTag(createTagDto: CreateTagDto) {
    try {
      const tag = this.create(createTagDto);
      const user = new User();
      user.id = createTagDto.userId;

      tag.user = user;
      await this.save(tag);

      return tag;
    } catch (error) {
      processError(error, Tag.name);
    }
  }
}
