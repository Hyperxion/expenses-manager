import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export namespace Constants {
  export enum Roles {
    Admin = '5aa5924d-e9e0-4054-884c-af20e1ccaeca',
    Redactor = '789bb232-d29e-4d0b-b958-8558add71b86',
    CoRedactor = '0db108e4-4549-4cef-b8dc-8ca738d812f5',
    Reader = '54baf8d8-4c48-4110-a5b2-a68b346b894e',
  }

  export enum TxTypes {
    Debit = '13163657-8ef1-4d84-9d9d-c098c4095478',
    Credit = 'ddcf99f2-3116-42bf-adf6-b3f7681ac6a6',
  }
}

export const processError = (error, entityName: string) => {
  if (error.code === '23505') {
    // duplicate name
    throw new ConflictException(`${entityName} name already exists`);
  } else {
    throw new InternalServerErrorException();
  }
};
