import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  sourceId: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  modeOfPayment: string;

  @IsNotEmpty()
  @IsString()
  notes: string;
}