import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesController } from './beneficiaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeneficiariesRepository } from './beneficiaries.repository';
import { Beneficiary } from './entities/beneficiary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary])],
  controllers: [BeneficiariesController],
  exports: [BeneficiariesService],
  providers: [BeneficiariesService, BeneficiariesRepository],
})
export class BeneficiariesModule {}
