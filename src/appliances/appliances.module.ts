import { Module } from '@nestjs/common';
import { AppliancesService } from './appliances.service';
import { AppliancesController } from './appliances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from './entities/appliance.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appliance]), CategoriesModule],
  controllers: [AppliancesController],
  providers: [AppliancesService],
  exports: [AppliancesService],
})
export class AppliancesModule {}
