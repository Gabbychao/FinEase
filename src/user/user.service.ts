import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from 'src/common/enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: userDto.email,
      },
    });
    if (isExist) {
      throw new ConflictException('Email already exists.');
    }
    const data = await this.prisma.user.create({
      select: {
        id: true,
        email: true,
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
    if (!data) {
      throw new NotFoundException('User not found.');
    }
    return {
      data,
    };
  }

  async getAll() {
    const data = await this.prisma.user.findMany();
    return {
      data,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const data = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      data,
    };
  }

  async delete(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  async createDefaultAdmin() {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = '12345';

    const isExist = await this.prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
    });

    if (!isExist) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: Role.ADMIN,
          firstName: 'Admin',
          lastName: 'Account',
        },
      });
      console.log('Default admin account created');
    } else {
      console.log('Default admin account already exists');
    }
  }

}