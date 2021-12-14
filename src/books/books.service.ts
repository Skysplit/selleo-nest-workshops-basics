import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDTO } from './create-book.dto';
import { UpdateBookDTO } from './update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: DatabaseService) {}

  async findAndFilterAuthors(authorIds?: number[]) {
    if (!authorIds) {
      return null;
    }

    const authors = await this.prisma.author.findMany({
      select: { id: true },
      where: {
        id: { in: authorIds },
      },
    });

    return authors.map((author) => author.id);
  }

  async find(id: number) {
    const book = await this.prisma.book.findUnique({
      include: {
        authors: { select: { author: {} } },
      },
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async create(data: CreateBookDTO) {
    const { authorIds, ...bookData } = data;

    const authors = (await this.findAndFilterAuthors(authorIds)) ?? [];

    const book = await this.prisma.book.create({
      include: {
        authors: {
          select: { author: {} },
        },
      },
      data: {
        ...bookData,
        authors: {
          create: authors.map((authorId) => ({
            author: {
              connect: {
                id: authorId,
              },
            },
          })),
        },
      },
    });

    return book;
  }

  async update(id: number, data: UpdateBookDTO) {
    const book = await this.find(id);

    const { authorIds, ...bookData } = data;

    const foundAuthors = await this.findAndFilterAuthors(authorIds);

    const bookAuthors =
      foundAuthors ?? book.authors.map((author) => author.author.id);

    return await this.prisma.book.update({
      include: {
        authors: {
          select: { author: {} },
        },
      },
      data: {
        ...bookData,
        authors: {
          create: bookAuthors.map((id) => ({
            author: {
              connect: { id },
            },
          })),
        },
      },
      where: { id },
    });
  }

  async delete(id: number) {
    const book = await this.find(id);

    await this.prisma.book.delete({
      where: { id },
    });

    return book;
  }
}
