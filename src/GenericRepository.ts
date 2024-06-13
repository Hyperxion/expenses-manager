import { Repository, DataSource, ObjectLiteral, EntityTarget } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly entityTarget: EntityTarget<T>,
    private readonly dataSource: DataSource,
  ) {
    super(entityTarget, dataSource.createEntityManager());
  }

  async findAllGeneric(): Promise<T[]> {
    return this.find();
  }

  /**
   *
   * @param id - ID of entity to find
   * @param userId - ID of user to which entity should exist
   * @returns - Found entity
   */
  //@Deprecated
  //async findById(id: string, userId: string): Promise<T | null> {
  async findById(where: any): Promise<T | null> {
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
