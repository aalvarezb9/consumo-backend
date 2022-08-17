import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Calculation } from '../../calculations/entities/calculation.entity';

@Entity('appliances')
export class Appliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  energy: string;

  @ManyToOne(() => Category, (category) => category.appliances, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Calculation, (calculation) => calculation.appliance)
  calculations: Calculation;
}
