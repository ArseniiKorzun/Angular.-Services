import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule],
  template: `
    <div class="item" [class.done]="todo().isCompleted">
      <label class="row">
        <input
          type="checkbox"
          [checked]="todo().isCompleted"
          (change)="toggle($any($event.target).checked)"
        />
        <span class="muted">Виконано</span>
      </label>

      @if (editing()) {
        <input type="text" [(ngModel)]="draft" (keyup.enter)="save()" (keyup.escape)="cancel()" style="flex: 3" />
        <button (click)="save()" [disabled]="!draft().trim()">Зберегти</button>
        <button class="secondary" (click)="cancel()">Скасувати</button>
      } @else {
        <span class="title" style="flex: 3">{{ todo().title }}</span>
        <button class="secondary" (click)="edit()">Редагувати</button>
        <button class="danger" (click)="remove()">Видалити</button>
      }
    </div>
  `,
  styles: `
    .item { display: flex; gap: 8px; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
    .done .title { text-decoration: line-through; color: #9ca3af; }
  `
})
export class TodoItem {
  private readonly todoService = inject(TodoService);
  readonly todo = input.required<Todo>();
  protected readonly editing = signal(false);
  protected readonly draft = signal('');

  protected toggle(checked: boolean): void {
    this.todoService.updateTodoStatus(this.todo().id, checked);
  }

  protected edit(): void {
    this.draft.set(this.todo().title);
    this.editing.set(true);
  }

  protected save(): void {
    this.todoService.updateTodo(this.todo().id, this.draft());
    this.editing.set(false);
  }

  protected cancel(): void {
    this.editing.set(false);
  }

  protected remove(): void {
    this.todoService.deleteTodo(this.todo().id);
  }
}
