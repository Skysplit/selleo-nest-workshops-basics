import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  async create(@Body() data: CreateBookDTO) {
    return await this.booksService.create(data);
  }
}
