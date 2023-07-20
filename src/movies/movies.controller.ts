import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'All Movies';
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `Search Something after : ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `One movie id = ${id}`;
  }

  @Post()
  create(@Body() movieData: object) {
    return `This will create a movie : (${JSON.stringify(movieData)})`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete Movies id: ${id}`;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() updateData) {
    return `Patch Movie id : ${id}, data : ${JSON.stringify(updateData)}`;
  }
}
