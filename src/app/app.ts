import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly links = [
    { path: '/todos', label: 'Список завдань' },
    { path: '/contacts', label: 'Контактна книга' },
    { path: '/chuck-norris', label: 'Чак Норріс' },
    { path: '/dictionary', label: 'Словник' }
  ];
}
