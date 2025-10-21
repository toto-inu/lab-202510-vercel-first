import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    const todo = this.todoService.findOne(Number(id));
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body('title') title: string): Todo {
    return this.todoService.create(title);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updates: Partial<Todo>,
  ): Todo {
    const todo = this.todoService.update(Number(id), updates);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    const success = this.todoService.delete(Number(id));
    if (!success) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
