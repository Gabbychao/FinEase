import { Type, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

class UserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  userEmail: string;
}

class TaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;
}

export class CreateProjectDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsNotEmpty()
  @IsString()
  projectCode: string;

  @IsNotEmpty()
  @IsString()
  billingMethod: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];
}
