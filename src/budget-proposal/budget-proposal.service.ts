import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBudgetProposalDto } from './dto/create-budget-proposal.dto';
import { UpdateBudgetProposalDto } from './dto/update-budget-proposal.dto';

@Injectable()
export class BudgetProposalService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBudgetProposalDto: CreateBudgetProposalDto) {
    return this.prisma.budgetProposal.create({ data: createBudgetProposalDto });
  }

  findAll() {
    return this.prisma.budgetProposal.findMany();
  }

  findOne(id: number) {
    return this.prisma.budgetProposal.findUnique({ where: { id } });
  }

  update(id: number, updateBudgetProposalDto: UpdateBudgetProposalDto) {
    return this.prisma.budgetProposal.update({
      data: updateBudgetProposalDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.budgetProposal.delete({ where: { id } });
  }
}