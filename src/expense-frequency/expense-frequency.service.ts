import { Injectable } from '@nestjs/common';
import { CreateExpenseFrequencyDto } from './dto/create-expense-frequency.dto';
import { UpdateExpenseFrequencyDto } from './dto/update-expense-frequency.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ExpenseFrequencyService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExpenseFrequencyDto: CreateExpenseFrequencyDto) {
    return this.prisma.expenseFrequency.create({ data: createExpenseFrequencyDto });
  }

  findAll() {
    return this.prisma.expenseFrequency.findMany();
  }

  findOne(id: number) {
    return this.prisma.expenseFrequency.findUnique({ where: { id } });
  }

  update(id: number, updateExpenseFrequencyDto: UpdateExpenseFrequencyDto) {
    return this.prisma.expenseFrequency.update({
      data: updateExpenseFrequencyDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.expenseFrequency.delete({ where: { id } });
  }
}