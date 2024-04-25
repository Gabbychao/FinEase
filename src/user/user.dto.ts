import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => bcrypt.hashSync(value, 10))
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber: string;
}

export class UserParam {
  @IsNotEmpty()
  @IsNumber()
  @IsMongoId()
  id: number;
}