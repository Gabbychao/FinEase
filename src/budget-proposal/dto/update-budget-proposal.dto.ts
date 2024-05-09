import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetProposalDto } from './create-budget-proposal.dto';

export class UpdateBudgetProposalDto extends PartialType(CreateBudgetProposalDto) {}