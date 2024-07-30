import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        projectUsers: true,
        ProjectTasks: true,
        customer: true, 
      },
    });
    if (project) {
      return {
        ...project,
        customerName: `${project.customer.firstName} ${project.customer.lastName}`,
      };
    }
    return null;
  }

  create(createProjectDto: CreateProjectDto) {
    const { users, tasks, ...projectData } = createProjectDto;

    return this.prisma.project.create({
      data: {
        ...projectData,
        projectUsers: {
          create: users.map((user) => ({
            userName: user.userName,
            userEmail: user.userEmail,
          })),
        },
        ProjectTasks: {
          create: tasks.map((task) => ({
            taskName: task.taskName,
            taskDescription: task.taskDescription,
          })),
        },
      },
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    const { users, tasks, ...projectData } = updateProjectDto;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        projectUsers: {
          deleteMany: {},
          create: users?.map((user) => ({
            userName: user.userName,
            userEmail: user.userEmail,
          })),
        },
        ProjectTasks: {
          deleteMany: {},
          create: tasks?.map((task) => ({
            taskName: task.taskName,
            taskDescription: task.taskDescription,
          })),
        },
      },
      include: {
        projectUsers: true,
        ProjectTasks: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
