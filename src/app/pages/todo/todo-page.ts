import { Component, computed, inject, signal } from '@angular/core';
import { TodoFilter, TodoService } from '../../services/todo.service';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';

@Component({
  selector: 'app-todo-page',
  imports: [TodoForm, TodoItem],
  template: `
    <h1>Список завдань</h1>

    <div class="card">
      <app-todo-form />
    </div>

    <div class="card">
      <div class="row" style="margin-bottom: 12px">
        @for (f of filters; track f.value) {
          <button class="secondary" [class.active]="filter() === f.value" (click)="filter.set(f.value)">
            {{ f.label }}
          </button>
        }
      </div>

      @for (todo of visibleTodos(); track todo.id) {
        <app-todo-item [todo]="todo" />
      } @empty {
        <p class="muted">Завдань немає.</p>
      }
    </div>
  `
})
export class TodoPage {
  private readonly todoService = inject(TodoService);
  protected readonly filter = signal<TodoFilter>('all');
  protected readonly visibleTodos = computed(() => this.todoService.getFiltered(this.filter()));
  protected readonly filters: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'Усі' },
    { value: 'active', label: 'Невиконані' },
    { value: 'completed', label: 'Виконані' }
  ];
}
