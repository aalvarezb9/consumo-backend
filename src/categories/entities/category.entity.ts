import { Appliance } from '../../appliances/entities/appliance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Appliance, (appliance) => appliance.category)
  appliances: Appliance[];
}
