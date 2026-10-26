import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact, ContactData } from '../../services/contact.service';

const emptyContact = (): ContactData => ({ name: '', phone: '', email: '', address: '', note: '' });

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  template: `
    <h2>{{ contact() ? 'Редагування контакту' : 'Новий контакт' }}</h2>
    <form #f="ngForm" (ngSubmit)="save.emit({ ...model })" class="form">
      <label>Ім'я *
        <input type="text" name="name" [(ngModel)]="model.name" required />
      </label>
      <label>Телефон *
        <input type="tel" name="phone" [(ngModel)]="model.phone" required pattern="^\\+?[0-9\\s\\-()]{7,}$" />
      </label>
      <label>Email
        <input type="email" name="email" [(ngModel)]="model.email" email />
      </label>
      <label>Адреса
        <input type="text" name="address" [(ngModel)]="model.address" />
      </label>
      <label>Нотатка
        <textarea name="note" rows="3" [(ngModel)]="model.note"></textarea>
      </label>
      <div class="row">
        <button type="submit" [disabled]="f.invalid">Зберегти</button>
        <button type="button" class="secondary" (click)="cancel.emit()">Скасувати</button>
      </div>
    </form>
  `,
  styles: `
    h2 { margin-top: 0; }
    .form { display: flex; flex-direction: column; gap: 10px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; color: #374151; }
    input.ng-invalid.ng-touched { border-color: #dc2626; }
  `
})
export class ContactForm {
  readonly contact = input<Contact | null>(null);
  readonly save = output<ContactData>();
  readonly cancel = output();
  protected model: ContactData = emptyContact();

  constructor() {
    effect(() => {
      const contact = this.contact();
      this.model = contact
        ? { name: contact.name, phone: contact.phone, email: contact.email, address: contact.address, note: contact.note }
        : emptyContact();
    });
  }
}
