import { Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ExpenseCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.prisma.expenseCategory.create({ data: createExpenseCategoryDto });
  }

  findAll() {
    return this.prisma.expenseCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.expenseCategory.findUnique({ where: { id } });
  }

  update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return this.prisma.expenseCategory.update({
      data: updateExpenseCategoryDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.expenseCategory.delete({ where: { id } });
  }
}