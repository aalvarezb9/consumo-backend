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
import { AppliancesService } from './appliances.service';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { UpdateApplianceDto } from './dto/update-appliance.dto';
import { Appliance } from './entities/appliance.entity';

@Controller('appliances')
export class AppliancesController {
  constructor(private readonly appliancesService: AppliancesService) {}

  @Post()
  create(@Body() createApplianceDto: CreateApplianceDto): Promise<Appliance> {
    return this.appliancesService.create(createApplianceDto);
  }

  @Get()
  findAll(@Query('category') category?: string): Promise<Appliance[]> {
    return this.appliancesService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appliance> {
    return this.appliancesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplianceDto: UpdateApplianceDto,
  ): Promise<Appliance> {
    return this.appliancesService.update(id, updateApplianceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Appliance> {
    return this.appliancesService.remove(id);
  }
}
