import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppliancesService } from '../appliances/appliances.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { UpdateCalculationDto } from './dto/update-calculation.dto';
import { Calculation } from './entities/calculation.entity';

@Injectable()
export class CalculationsService {
  constructor(
    @InjectRepository(Calculation)
    private readonly calculationsRepository: Repository<Calculation>,
    private readonly appliancesService: AppliancesService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createCalculationDto: CreateCalculationDto,
  ): Promise<Calculation> {
    const { qty, watts, hours } = createCalculationDto;
    const [user, appliance] = await Promise.all([
      this.usersService.findOne(createCalculationDto.userId),
      this.appliancesService.findOne(createCalculationDto.applianceId),
    ]);

    const calculation = this.calculationsRepository.create({
      qty,
      watts,
      hours,
      user,
      appliance,
    });

    const calculationSaved = await this.calculationsRepository.save(
      calculation,
    );

    return calculationSaved;
  }

  findAll() {
    return `This action returns all calculations`;
  }

  async findOne(id: string, category: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    const appliances = await this.appliancesService.findAll(category);
    const calculations = await this.calculationsRepository.find({
      where: { user },
    });
    const calculationsToReturn: any[] = [];

    for (let i = 0; i < appliances.length; i++) {
      for (let j = 0; j < calculations.length; j++) {
        if (appliances[i].id === calculations[j].appliance.id) {
          calculationsToReturn.push({
            product: appliances[i].name,
            hours: +calculations[j].hours,
            energy: +appliances[i].energy,
            qty: +calculations[j].qty,
            total:
              +calculations[j].hours *
              +appliances[i].energy *
              +calculations[j].qty,
          });
        }
      }
    }

    return calculationsToReturn;
  }

  async findUserCalculations(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    const calculations = await this.calculationsRepository.find({
      where: { user },
    });

    const result = calculations.reduce(
      (prev, curr) => +curr.hours * +curr.qty * +curr.watts + prev,
      0,
    );
    const n = calculations.length;

    return { result, n };
  }
}
