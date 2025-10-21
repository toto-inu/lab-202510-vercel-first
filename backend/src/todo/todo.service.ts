import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Learn NestJS',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Build a Todo API',
      completed: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Connect Next.js to NestJS',
      completed: false,
      createdAt: new Date(),
    },
  ];
  private nextId = 4;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(title: string): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updates: Partial<Todo>): Todo | undefined {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return undefined;
    }
    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updates };
    return this.todos[todoIndex];
  }

  delete(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this.todos.length < initialLength;
  }
}
