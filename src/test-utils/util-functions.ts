import { v4 as uuidv4 } from 'uuid';
import { BIG_RANGE } from './test.constants';

export function randomNumber(range: number): number {
  return Math.floor(Math.random() * range);
}

export function randomFloatNumber(range: number): number {
  return +(Math.random() * range + 0.14).toFixed(2);
}

export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}

/**
 * Turns any string into camel case
 *
 * @param str
 * @returns str in camelCase
 */
export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function randomId(): string {
  return `t-${uuidv4().substring(2)}`;
}

export function randomDate(): Date {
  return new Date(
    new Date(2022, 10, 28).getTime() +
      Math.random() * (new Date().getTime() - new Date(2022, 10, 28).getTime()),
  );
}

export function randomNumberToString(range: number): string {
  return Math.floor(Math.random() * range).toString();
}

/**
 * Generates string value for column in format "<columnName>-<randomNumber>".
 * For column with name 'address' it would be "address-6543"
 *
 * @param column - name of the column
 * @returns - generated value
 */
export function randomStringValue(column?: string): string {
  return `${column}-${randomNumber(BIG_RANGE)}`;
}

/**
 * Converts sequelize timestamps of an object (in Date format) into strings.
 * Sequelize timestamps are:
 *  - *createdAt: Date*
 *  - *updatedAt: Date*
 *  - *deletedAt: Date*
 *
 * @param objects - object that contains model's timestamps as strings. Usualy response object
 */
export function convertTimestampsToDates(objects: any[]) {
  for (const obj of objects) {
    if (obj.createdAt) {
      obj.createdAt = new Date(obj.createdAt);
    }

    if (obj.updatedAt) {
      obj.updatedAt = new Date(obj.updatedAt);
    }

    if (obj.deletedAt) {
      obj.deletedAt = new Date(obj.deletedAt);
    }
  }
}

/**
 * Converts sequelize times of an object (in string format) into dates.
 * Runs convertTimestampsToDates first.
 *
 * Then will convert:
 *  - *platnostDo*
 *  - *platnostOd*
 *
 * @param objects - object that contains model's timestamps as strings. Usualy response object
 */
export function convertTimesToDates(objects: any[]) {
  convertTimestampsToDates(objects);

  for (const obj of objects) {
    if (obj.platnostDo) {
      obj.platnostDo = new Date(obj.platnostDo);
    }

    if (obj.platnostOd) {
      obj.platnostOd = new Date(obj.platnostOd);
    }
  }
}

export function getRandomValueFromArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
