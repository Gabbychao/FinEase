import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetProposalService } from './budget-proposal.service';
import { CreateBudgetProposalDto } from './dto/create-budget-proposal.dto';
import { UpdateBudgetProposalDto } from './dto/update-budget-proposal.dto';

@Controller('budget-proposal')
export class BudgetProposalController {
  constructor(private readonly budgetProposalService: BudgetProposalService) {}

  @Post()
  create(@Body() createBudgetProposalDto: CreateBudgetProposalDto) {
    return this.budgetProposalService.create(createBudgetProposalDto);
  }

  @Get()
  findAll() {
    return this.budgetProposalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetProposalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetProposalDto: UpdateBudgetProposalDto) {
    return this.budgetProposalService.update(+id, updateBudgetProposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetProposalService.remove(+id);
  }
}