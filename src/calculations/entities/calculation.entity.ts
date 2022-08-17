import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Appliance } from '../../appliances/entities/appliance.entity';
import { User } from '../../users/entities/user.entity';

@Entity('calculations')
export class Calculation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  watts: string;

  @Column({ type: 'varchar' })
  qty: string;

  @Column({ type: 'varchar' })
  hours: string;

  @ManyToOne(() => User, (user) => user.calculations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Appliance, (appliance) => appliance.calculations, {
    eager: true,
    onDelete: 'CASCADE',
  })
  appliance: Appliance;
}
