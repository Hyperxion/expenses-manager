import {
  Repository,
  DataSource,
  ObjectLiteral,
  EntityTarget,
  DeepPartial,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly entityTarget: EntityTarget<T>,
    private readonly dataSource: DataSource,
  ) {
    super(entityTarget, dataSource.createEntityManager());
  }

  async createGeneric(newEntity: DeepPartial<T>) {
    const entity = this.create(newEntity);
    this.save(entity);
  }

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
