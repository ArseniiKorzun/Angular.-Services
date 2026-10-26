import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChuckJoke, ChuckNorrisService } from '../../services/chuck-norris.service';

type SortOrder = 'none' | 'asc' | 'desc';

const NO_CATEGORY = 'uncategorized';
const categoryOf = (joke: ChuckJoke) => joke.categories[0] ?? NO_CATEGORY;

@Component({
  selector: 'app-chuck-norris-page',
  imports: [FormsModule, DatePipe],
  templateUrl: './chuck-norris-page.html',
  styleUrl: './chuck-norris-page.css'
})
export class ChuckNorrisPage implements OnInit {
  protected readonly service = inject(ChuckNorrisService);
  protected readonly noCategory = NO_CATEGORY;

  protected readonly categories = signal<string[]>([]);
  protected readonly jokes = signal<ChuckJoke[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly expandedId = signal<string | null>(null);

  protected readonly randomCategory = signal('');
  protected readonly filterCategory = signal('');
  protected readonly filterText = signal('');
  protected readonly sortOrder = signal<SortOrder>('none');

  protected readonly visibleJokes = computed(() => {
    const category = this.filterCategory();
    const text = this.filterText().trim().toLowerCase();
    const result = this.jokes().filter(
      j => (!category || categoryOf(j) === category) && (!text || j.value.toLowerCase().includes(text))
    );
    const order = this.sortOrder();
    if (order === 'none') return result;
    const dir = order === 'asc' ? 1 : -1;
    return [...result].sort((a, b) => categoryOf(a).localeCompare(categoryOf(b)) * dir);
  });

  ngOnInit(): void {
    this.service.getCategories().subscribe({
      next: categories => this.categories.set(categories),
      error: () => this.error.set('Не вдалося завантажити категорії.')
    });
    this.loading.set(true);
    this.service.getRandomJokes(10).subscribe({
      next: jokes => {
        this.jokes.set(jokes.filter((joke, i) => jokes.findIndex(j => j.id === joke.id) === i));
        this.loading.set(false);
      },
      error: () => this.fail()
    });
  }

  protected randomJoke(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.getRandomJoke(this.randomCategory() || undefined).subscribe({
      next: joke => {
        this.jokes.update(list => [joke, ...list.filter(j => j.id !== joke.id)]);
        this.expandedId.set(joke.id);
        this.loading.set(false);
      },
      error: () => this.fail()
    });
  }

  protected toggleDetails(id: string): void {
    this.expandedId.update(current => (current === id ? null : id));
  }

  protected categoryOf(joke: ChuckJoke): string {
    return categoryOf(joke);
  }

  private fail(): void {
    this.loading.set(false);
    this.error.set('Помилка запиту до Chuck Norris API.');
  }
}
