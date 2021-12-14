import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './create-book.dto';
import { UpdateBookDTO } from './update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.find(id);
  }

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

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDTO,
  ) {
    return await this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.delete(id);
  }
}
