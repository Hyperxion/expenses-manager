import {
  Repository,
  DataSource,
  ObjectLiteral,
  EntityTarget,
  DeepPartial,
} from 'typeorm';
import { User } from './users/entities/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly entityTarget: EntityTarget<T>,
    private readonly dataSource: DataSource,
  ) {
    super(entityTarget, dataSource.createEntityManager());
  }

  /**
   * It works but does not catches errors. Everything is OK even console throws error.
   * Try-Catch statement did not help
   */
  // async createGeneric(newEntity: DeepPartial<T>) {
  //   try {
  //     const entity = this.create(newEntity);
  //     const user = new User();
  //     user.id = newEntity.userId;

  //     entity.user = user;

  //     this.save(entity);
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       // duplicate name
  //       throw new ConflictException('Store name already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }

  async findAllGeneric(): Promise<T[]> {
    return this.find();
  }

  async removeGeneric(id: string) {
    const entity = await this.findGeneric({ id });

    if (entity) return this.remove(entity);

    return null;
  }

  async updateGeneric(id: string, updateEntityDto: DeepPartial<T>) {
    const entity = await this.findGeneric({ id });

    if (!entity) return;

    const updatedEntity = { ...entity, ...updateEntityDto };

    return await this.save(updatedEntity);
  }

  /**
   * Where object must follow this structure:
   *
   * *To find by object ID and user ID use this structure*
   *
   * ```js
   * {
   *   id: id,
   *   user: { id: userId },
   * };
   * ```
   *
   * *To find by ID use this structure:*
   *
   * ```js
   * { id };
   * ```
   *
   * @param where - where clause
   * @returns - Found entity
   */
  async findGeneric(where: any): Promise<T | null> {
    return await this.findOne({
      where,
    });
  }

  /**
   *
   * @returns - Found rows of entity
   */
  async findAll() {
    return await this.find();
  }
}
