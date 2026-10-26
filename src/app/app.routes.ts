import { Routes } from '@angular/router';
import { TodoPage } from './pages/todo/todo-page';
import { ContactsPage } from './pages/contacts/contacts-page';
import { ChuckNorrisPage } from './pages/chuck-norris/chuck-norris-page';
import { DictionaryPage } from './pages/dictionary/dictionary-page';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoPage, title: 'Список завдань' },
  { path: 'contacts', component: ContactsPage, title: 'Контактна книга' },
  { path: 'chuck-norris', component: ChuckNorrisPage, title: 'Жарти Чака Норріса' },
  { path: 'dictionary', component: DictionaryPage, title: 'Словник' },
  { path: '**', redirectTo: 'todos' }
];
