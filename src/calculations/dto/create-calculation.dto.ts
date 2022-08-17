import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalculationDto {
  @IsNotEmpty()
  @IsString()
  watts: string;

  @IsNotEmpty()
  @IsString()
  qty: string;

  @IsNotEmpty()
  @IsString()
  hours: string;

  @IsNotEmpty()
  @IsString()
  applianceId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
