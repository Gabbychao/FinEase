import { Module } from '@nestjs/common';
import { ExpenseFrequencyService } from './expense-frequency.service';
import { ExpenseFrequencyController } from './expense-frequency.controller';

@Module({
  controllers: [ExpenseFrequencyController],
  providers: [ExpenseFrequencyService],
})
export class ExpenseFrequencyModule {}
