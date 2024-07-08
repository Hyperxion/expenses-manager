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
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetUserId } from '../auth/getUserId.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@UseGuards(AuthGuard)
@Controller('Stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @GetUserId() userId: string) {
    createStoreDto.userId = userId;
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
