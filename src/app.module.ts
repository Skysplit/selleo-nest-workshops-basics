import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [DatabaseModule, AuthorsModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
