import { RequestStatus } from "@/common/enum";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBudgetProposalDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  rental: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maintenance: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  supplies: number;

  @IsNotEmpty()
  @IsString()
  assumptions: string;

  @IsNotEmpty()
  @IsString()
  methodology: string;

  @IsNotEmpty()
  @IsEnum(RequestStatus)
  status: RequestStatus;
}