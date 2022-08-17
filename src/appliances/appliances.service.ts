import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { UpdateApplianceDto } from './dto/update-appliance.dto';
import { Appliance } from './entities/appliance.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class AppliancesService {
  constructor(
    @InjectRepository(Appliance)
    private readonly appliancesRepository: Repository<Appliance>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createApplianceDto: CreateApplianceDto): Promise<Appliance> {
    const category = await this.categoriesService.findOne(
      createApplianceDto.categoryId,
    );
    const applianceToSave = { ...createApplianceDto, category };
    const savedAppliance = await this.appliancesRepository.save(
      applianceToSave,
    );
    return savedAppliance;
  }

  async findAll(category?: string): Promise<Appliance[]> {
    if (!category) {
      const appliances = await this.appliancesRepository.find();
      return appliances;
    }

    const categoryFound = await this.categoriesService.findOne(category);
    const appliances = await this.appliancesRepository.find({
      where: { category: categoryFound },
    });
    return appliances;
  }

  async findOne(id: string): Promise<Appliance> {
    const appliance = await this.appliancesRepository.findOneOrFail({
      where: { id },
    });
    return appliance;
  }

  async update(
    id: string,
    updateApplianceDto: UpdateApplianceDto,
  ): Promise<Appliance> {
    const appliance = await this.findOne(id);
    this.appliancesRepository.merge(appliance, updateApplianceDto);
    const updatedAppliance = await this.appliancesRepository.save(appliance);
    return updatedAppliance;
  }

  async remove(id: string): Promise<Appliance> {
    const appliance = await this.findOne(id);
    const removedAppliance = await this.appliancesRepository.remove(appliance);
    return removedAppliance;
  }

  async findMany(ids: string[]): Promise<Appliance[]> {
    const appliances: Appliance[] = [];
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i];
      let appliance = await this.appliancesRepository.findOne({
        where: { id },
      });
      appliances.push(appliance);
    }

    return appliances;
  }
}
