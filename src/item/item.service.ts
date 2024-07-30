import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: number) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({ data: createItemDto });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      data: updateItemDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.item.delete({ where: { id } });
  }
}
