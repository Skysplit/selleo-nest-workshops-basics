import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDTO } from './create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: DatabaseService) {}

  async create(data: CreateBookDTO) {
    const { authorIds, ...bookData } = data;

    const authors = await this.prisma.author.findMany({
      select: { id: true },
      where: {
        id: { in: authorIds },
      },
    });

    const book = await this.prisma.book.create({
      include: {
        authors: {
          select: { authorId: false, bookId: false },
          include: {
            author: {},
          },
        },
      },
      data: {
        ...bookData,
        authors: {
          create: authors.map((author) => ({
            author: {
              connect: {
                id: author.id,
              },
            },
          })),
        },
      },
    });

    return book;
  }
}
