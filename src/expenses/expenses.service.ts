import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { UpdateExpensesDto } from './dto/update-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.expenses.findMany();
  }

  findOne(id: number) {
    return this.prisma.expenses.findUnique({ where: { id } });
  }

  create(createExpensesDto: CreateExpensesDto) {
    return this.prisma.expenses.create({ data: createExpensesDto });
  }

  update(id: number, updateExpensesDto: UpdateExpensesDto) {
    return this.prisma.expenses.update({
      data: updateExpensesDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.expenses.delete({ where: { id } });
  }
}
