import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private invoiceService: InvoiceService,
  ) {}

  findAll() {
    return this.prisma.payment.findMany();
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const {
      userId,
      customerId,
      dateOfPayment,
      paymentNumber,
      modeOfPayment,
      referenceNumber,
      totalAmount,
      payments,
    } = createPaymentDto;

    const createdPayment = await this.prisma.payment.create({
      data: {
        user: { connect: { id: userId } },
        customers: { connect: { id: customerId } },
        dateOfPayment,
        paymentNumber,
        modeOfPayment,
        referenceNumber,
        totalAmount,
        paymentItems: {
          create: payments.map((payment) => ({
            amount: payment.amount,
            invoice: { connect: { id: payment.invoiceId } },
          })),
        },
      },
      include: {
        paymentItems: {
          include: {
            invoice: true,
          },
        },
      },
    });

    for (const payment of payments) {
      await this.invoiceService.updateStatus(payment.invoiceId);
    }

    return createdPayment;
  }
  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const {
      customerId,
      dateOfPayment,
      modeOfPayment,
      referenceNumber,
      paymentNumber,
      payments,
    } = updatePaymentDto;

    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        customerId,
        dateOfPayment,
        modeOfPayment,
        referenceNumber,
        paymentNumber,
        totalAmount: payments.reduce((sum, item) => sum + item.amount, 0),
        paymentItems: {
          deleteMany: {},
          create: payments.map((item) => ({
            amount: item.amount,
            invoice: { connect: { id: item.invoiceId } },
          })),
        },
      },
      include: {
        paymentItems: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
