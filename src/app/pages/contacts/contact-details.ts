import { Component, input, output } from '@angular/core';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-contact-details',
  template: `
    <h2>{{ contact().name }}</h2>
    <dl>
      <dt>Телефон</dt>
      <dd><a [href]="'tel:' + contact().phone">{{ contact().phone }}</a></dd>
      <dt>Email</dt>
      <dd><a [href]="'mailto:' + contact().email">{{ contact().email || '—' }}</a></dd>
      <dt>Адреса</dt>
      <dd>{{ contact().address || '—' }}</dd>
      <dt>Нотатка</dt>
      <dd>{{ contact().note || '—' }}</dd>
    </dl>
    <div class="row">
      <button (click)="edit.emit()">Редагувати</button>
      <button class="danger" (click)="remove.emit()">Видалити</button>
    </div>
  `,
  styles: `
    h2 { margin-top: 0; }
    dt { font-weight: 600; color: #6b7280; font-size: 0.85rem; }
    dd { margin: 0 0 10px; }
  `
})
export class ContactDetails {
  readonly contact = input.required<Contact>();
  readonly edit = output();
  readonly remove = output();
}
