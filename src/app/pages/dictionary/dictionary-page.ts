import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DictionaryEntry, DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionary-page',
  imports: [FormsModule],
  templateUrl: './dictionary-page.html',
  styleUrl: './dictionary-page.css'
})
export class DictionaryPage {
  private readonly dictionaryService = inject(DictionaryService);

  protected readonly word = signal('');
  protected readonly entries = signal<DictionaryEntry[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected search(): void {
    const word = this.word().trim();
    if (!word) return;
    this.loading.set(true);
    this.error.set('');
    this.entries.set([]);
    this.dictionaryService.getDefinition(word).subscribe({
      next: entries => {
        this.entries.set(entries);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(err.status === 404 ? `Слово «${word}» не знайдено.` : 'Помилка запиту до Dictionary API.');
      }
    });
  }

  protected transcription(entry: DictionaryEntry): string {
    return entry.phonetic || entry.phonetics.find(p => p.text)?.text || '';
  }
}
