import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AppliancesModule } from './appliances/appliances.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationsModule } from './calculations/calculations.module';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Appliance } from './appliances/entities/appliance.entity';
import { Calculation } from './calculations/entities/calculation.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Category, Appliance, Calculation],
      synchronize: true,
    }),
    UsersModule,
    CategoriesModule,
    AppliancesModule,
    CalculationsModule,
  ],
})
export class AppModule {}
