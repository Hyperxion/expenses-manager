import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Beneficiaries')
@UseGuards(AuthGuard)
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Post()
  create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    return this.beneficiariesService.create(createBeneficiaryDto);
  }

  @Get()
  findAll() {
    return this.beneficiariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiariesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeneficiaryDto: UpdateBeneficiaryDto,
  ) {
    return this.beneficiariesService.update(id, updateBeneficiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficiariesService.remove(id);
  }
}
