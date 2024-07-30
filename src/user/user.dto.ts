import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/common/enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => bcrypt.hashSync(value, 10))
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1,30)
  firstName: string;

  @IsNotEmpty() 
  @IsString()
  @Length(1,30)
  lastName: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UserParam {
  @IsNotEmpty()
  @IsNumber()
  @IsMongoId()
  id: number;
}
