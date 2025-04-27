interface EntityConstructor<T> {
  new (): T;
}

/**
 *
 * @param entityClass - Entity which we want to generate
 * @returns - one generated instance of entity
 */
export function generateSingleTestData<T>(
  entityClass: EntityConstructor<T>,
): T {
  return new entityClass();
}

/**
 *
 * @param entityClass - Entity which we want to generate
 * @param count - number of instances to generate
 * @returns - array of generated instances
 */
export function generateMultipleTestData<T>(
  entityClass: EntityConstructor<T>,
  count: number,
): T[] {
  const testData: T[] = [];
  for (let i = 0; i < count; i++) {
    const entity = generateSingleTestData(entityClass);
    testData.push(entity);
  }
  return testData;
}
