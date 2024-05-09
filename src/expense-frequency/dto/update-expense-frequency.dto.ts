import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseFrequencyDto } from './create-expense-frequency.dto';

export class UpdateExpenseFrequencyDto extends PartialType(CreateExpenseFrequencyDto) {}