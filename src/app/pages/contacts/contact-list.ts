import { Component, input, output } from '@angular/core';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  template: `
    <ul class="plain">
      @for (contact of contacts(); track contact.id) {
        <li [class.selected]="contact.id === selectedId()" (click)="contactSelect.emit(contact.id)">
          <strong>{{ contact.name }}</strong>
          <div class="muted">{{ contact.phone }}</div>
        </li>
      } @empty {
        <li class="muted">Контактів не знайдено.</li>
      }
    </ul>
  `,
  styles: `
    li { padding: 10px; border-radius: 6px; cursor: pointer; border-bottom: 1px solid #f3f4f6; }
    li:hover { background: #f9fafb; }
    li.selected { background: #e0e7ff; }
  `
})
export class ContactList {
  readonly contacts = input.required<Contact[]>();
  readonly selectedId = input<number | null>(null);
  readonly contactSelect = output<number>();
}
