import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { User } from '../users/entities/user.entity';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { Beneficiary } from './entities/beneficiary.entity';
import { processError } from '../constants';

@Injectable()
export class BeneficiariesRepository extends BaseRepository<Beneficiary> {
  constructor(dataSource: DataSource) {
    super(Beneficiary, dataSource);
  }

  async createBeneficiary(createBeneficiaryDto: CreateBeneficiaryDto) {
    try {
      const beneficiary = this.create(createBeneficiaryDto);
      const user = new User();
      user.id = createBeneficiaryDto.userId;

      beneficiary.user = user;
      await this.save(beneficiary);

      return beneficiary;
    } catch (error) {
      processError(error, Beneficiary.name);
    }
  }
}
