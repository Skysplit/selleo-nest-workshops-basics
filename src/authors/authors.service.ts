import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateAuthorDTO } from './update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: DatabaseService) {}

  async find(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async list() {
    return await this.prisma.author.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
  }

  async create(firstName: string, lastName: string) {
    return await this.prisma.author.create({
      data: {
        firstName,
        lastName,
      },
    });
  }

  async update(id: number, data: UpdateAuthorDTO) {
    await this.find(id);

    return await this.prisma.author.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    const author = this.find(id);

    await this.prisma.author.delete({
      where: { id },
    });

    return author;
  }
}
