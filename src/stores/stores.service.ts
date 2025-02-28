import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { LoggerService } from '../logger/logger.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(
    private loggerService: LoggerService,
    private storesRepository: StoresRepository,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    return await this.storesRepository.createStore(createStoreDto);
  }

  async findAll() {
    return await this.storesRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.storesRepository.findGeneric({ id });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return await this.storesRepository.updateGeneric(id, updateStoreDto);
  }

  async remove(id: string) {
    return await this.storesRepository.removeGeneric(id);
  }

  async deleteAll() {
    return await this.storesRepository.deleteAll();
  }
}
