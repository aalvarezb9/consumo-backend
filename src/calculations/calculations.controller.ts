import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { UpdateCalculationDto } from './dto/update-calculation.dto';
import { Calculation } from './entities/calculation.entity';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post()
  create(
    @Body() createCalculationDto: CreateCalculationDto,
  ): Promise<Calculation> {
    return this.calculationsService.create(createCalculationDto);
  }

  @Get(':id')
  findUserCalculations(@Param('id') id: string): Promise<any> {
    return this.calculationsService.findUserCalculations(id);
  }

  @Get(':id/categories/:category')
  findOne(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<any> {
    return this.calculationsService.findOne(id, category);
  }
}
