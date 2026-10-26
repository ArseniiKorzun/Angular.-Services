import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

export interface ChuckJoke {
  id: string;
  value: string;
  categories: string[];
  created_at: string;
  updated_at: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ChuckNorrisService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.chucknorris.io/jokes';
  private readonly favorites = signal<ChuckJoke[]>([]);

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getRandomJoke(category?: string): Observable<ChuckJoke> {
    const params = category ? new HttpParams().set('category', category) : undefined;
    return this.http.get<ChuckJoke>(`${this.baseUrl}/random`, { params });
  }

  getRandomJokes(count: number): Observable<ChuckJoke[]> {
    return forkJoin(Array.from({ length: count }, () => this.getRandomJoke()));
  }

  getFavorites() {
    return this.favorites.asReadonly();
  }

  isFavorite(id: string): boolean {
    return this.favorites().some(j => j.id === id);
  }

  toggleFavorite(joke: ChuckJoke): void {
    this.favorites.update(list =>
      list.some(j => j.id === joke.id) ? list.filter(j => j.id !== joke.id) : [...list, joke]
    );
  }
}
