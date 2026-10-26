import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  template: `
    <form class="row" (ngSubmit)="add()">
      <input type="text" name="title" placeholder="Нове завдання..." [(ngModel)]="title" style="flex: 1" />
      <button type="submit" [disabled]="!title().trim()">Додати</button>
    </form>
  `
})
export class TodoForm {
  private readonly todoService = inject(TodoService);
  protected readonly title = signal('');

  protected add(): void {
    this.todoService.addTodo(this.title());
    this.title.set('');
  }
}
