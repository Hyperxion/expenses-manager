import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { LoggerService } from '../logger/logger.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    private loggerService: LoggerService,
    private tagsRepository: TagsRepository,
  ) {}

  async create(createTagDto: CreateTagDto) {
    //return await this.tagsRepository.createTag(createTagDto);
    return await this.tagsRepository.createGeneric(createTagDto);
  }

  async findAll() {
    return await this.tagsRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.tagsRepository.findGeneric({ id });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.tagsRepository.updateGeneric(id, updateTagDto);
  }

  async remove(id: string) {
    return await this.tagsRepository.removeGeneric(id);
  }
}
