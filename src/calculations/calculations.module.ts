import { Module } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationsController } from './calculations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculation } from './entities/calculation.entity';
import { UsersModule } from '../users/users.module';
import { AppliancesModule } from '../appliances/appliances.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculation]),
    UsersModule,
    AppliancesModule,
  ],
  controllers: [CalculationsController],
  providers: [CalculationsService],
  exports: [CalculationsService],
})
export class CalculationsModule {}
