import { Injectable } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { LoggerService } from '../logger/logger.service';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { BeneficiariesRepository } from './beneficiaries.repository';

@Injectable()
export class BeneficiariesService {
  constructor(
    private loggerService: LoggerService,
    private beneficiariesRepository: BeneficiariesRepository,
  ) {}

  async create(createBeneficiaryDto: CreateBeneficiaryDto) {
    return await this.beneficiariesRepository.createGeneric(
      createBeneficiaryDto,
    );
  }

  async findAll() {
    return await this.beneficiariesRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.beneficiariesRepository.findGeneric({ id });
  }

  async update(id: string, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return await this.beneficiariesRepository.updateGeneric(
      id,
      updateBeneficiaryDto,
    );
  }

  async remove(id: string) {
    return await this.beneficiariesRepository.removeGeneric(id);
  }
}
