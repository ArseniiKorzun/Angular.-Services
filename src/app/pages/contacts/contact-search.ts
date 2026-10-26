import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  imports: [FormsModule],
  template: `
    <input
      type="search"
      placeholder="Пошук за ім'ям, телефоном, email або адресою..."
      [(ngModel)]="query"
      style="width: 100%"
    />
  `
})
export class ContactSearch {
  readonly query = model('');
}
