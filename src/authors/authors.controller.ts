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
import { AuthorsService } from './authors.service';
import { UpdateAuthorDTO } from './update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async index() {
    return await this.authorsService.list();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.authorsService.find(id);
  }

  @Post()
  async create(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const author = await this.authorsService.create(firstName, lastName);

    return author;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAuthorDTO,
  ) {
    const author = await this.authorsService.update(id, data);

    return author;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.authorsService.delete(id);
  }
}
