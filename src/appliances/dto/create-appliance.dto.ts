import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplianceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  energy: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
