import { Module } from '@nestjs/common';
import { BudgetProposalService } from './budget-proposal.service';
import { BudgetProposalController } from './budget-proposal.controller';

@Module({
  controllers: [BudgetProposalController],
  providers: [BudgetProposalService],
})
export class BudgetProposalModule {}