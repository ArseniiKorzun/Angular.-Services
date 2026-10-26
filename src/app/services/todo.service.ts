import { Injectable, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private nextId = 4;
  private readonly todos = signal<Todo[]>([
    { id: 1, title: 'Вивчити сервіси в Angular', isCompleted: true },
    { id: 2, title: 'Зробити домашнє завдання', isCompleted: false },
    { id: 3, title: 'Підготуватися до наступного заняття', isCompleted: false }
  ]);

  getTodos() {
    return this.todos.asReadonly();
  }

  getFiltered(filter: TodoFilter): Todo[] {
    const todos = this.todos();
    if (filter === 'all') return todos;
    return todos.filter(t => t.isCompleted === (filter === 'completed'));
  }

  addTodo(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    this.todos.update(list => [...list, { id: this.nextId++, title: trimmed, isCompleted: false }]);
  }

  updateTodo(id: number, title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    this.todos.update(list => list.map(t => (t.id === id ? { ...t, title: trimmed } : t)));
  }

  updateTodoStatus(id: number, isCompleted: boolean): void {
    this.todos.update(list => list.map(t => (t.id === id ? { ...t, isCompleted } : t)));
  }

  deleteTodo(id: number): void {
    this.todos.update(list => list.filter(t => t.id !== id));
  }
}
