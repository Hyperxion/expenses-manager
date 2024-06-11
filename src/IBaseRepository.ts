import { Repository, DeepPartial } from 'typeorm';

export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: DeepPartial<T>): Promise<T | undefined>;
  delete(id: number): Promise<void>;
}
