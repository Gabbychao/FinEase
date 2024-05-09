import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseFrequencyService } from './expense-frequency.service';
import { CreateExpenseFrequencyDto } from './dto/create-expense-frequency.dto';
import { UpdateExpenseFrequencyDto } from './dto/update-expense-frequency.dto';

@Controller('expense-frequency')
export class ExpenseFrequencyController {
  constructor(private readonly expenseFrequencyService: ExpenseFrequencyService) {}

  @Post()
  create(@Body() createExpenseFrequencyDto: CreateExpenseFrequencyDto) {
    return this.expenseFrequencyService.create(createExpenseFrequencyDto);
  }

  @Get()
  findAll() {
    return this.expenseFrequencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseFrequencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseFrequencyDto: UpdateExpenseFrequencyDto) {
    return this.expenseFrequencyService.update(+id, updateExpenseFrequencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseFrequencyService.remove(+id);
  }
}