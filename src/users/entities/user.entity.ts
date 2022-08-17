import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Calculation } from '../../calculations/entities/calculation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Calculation, (calculation) => calculation.user, {
    eager: true,
  })
  calculations: Calculation;
}
