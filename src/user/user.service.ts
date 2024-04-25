import { Role } from '@/common/enum';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateUserDto } from '@/user/user.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        username: userDto.username,
      },
    });
    if (isExist) {
      throw new ConflictException('Username already exists.');
    }
    const data = await this.prisma.user.create({
      select: {
        id: true,
        username: true,
      },
      data: { ...userDto, role: Role.CFO },
    });
    return {
      data,
    };
  }

  async get(id: number) {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
    };
  }
}