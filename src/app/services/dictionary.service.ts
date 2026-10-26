import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Phonetic {
  text?: string;
}

export interface Definition {
  definition: string;
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  getDefinition(word: string): Observable<DictionaryEntry[]> {
    return this.http.get<DictionaryEntry[]>(`${this.baseUrl}/${encodeURIComponent(word.trim().toLowerCase())}`);
  }
}
