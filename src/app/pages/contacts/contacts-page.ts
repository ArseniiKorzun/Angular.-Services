import { Component, computed, inject, signal } from '@angular/core';
import { ContactData, ContactService } from '../../services/contact.service';
import { ContactDetails } from './contact-details';
import { ContactForm } from './contact-form';
import { ContactList } from './contact-list';
import { ContactSearch } from './contact-search';

type Mode = 'view' | 'add' | 'edit';

@Component({
  selector: 'app-contacts-page',
  imports: [ContactSearch, ContactList, ContactDetails, ContactForm],
  template: `
    <h1>Контактна книга</h1>

    <div class="layout">
      <div class="card">
        <div class="row" style="margin-bottom: 12px">
          <app-contact-search [(query)]="query" style="flex: 1" />
          <button (click)="startAdd()">+ Додати</button>
        </div>
        <app-contact-list [contacts]="filtered()" [selectedId]="selectedId()" (contactSelect)="selectContact($event)" />
      </div>

      <div class="card">
        @switch (mode()) {
          @case ('add') {
            <app-contact-form (save)="add($event)" (cancel)="mode.set('view')" />
          }
          @case ('edit') {
            <app-contact-form [contact]="selected()" (save)="update($event)" (cancel)="mode.set('view')" />
          }
          @default {
            @if (selected(); as contact) {
              <app-contact-details [contact]="contact" (edit)="mode.set('edit')" (remove)="remove(contact.id)" />
            } @else {
              <p class="muted">Оберіть контакт зі списку, щоб переглянути деталі.</p>
            }
          }
        }
      </div>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 16px; align-items: start; }
    @media (max-width: 720px) { .layout { grid-template-columns: 1fr; } }
  `
})
export class ContactsPage {
  private readonly contactService = inject(ContactService);
  protected readonly query = signal('');
  protected readonly selectedId = signal<number | null>(null);
  protected readonly mode = signal<Mode>('view');

  protected readonly filtered = computed(() => this.contactService.searchContacts(this.query()));

  protected readonly selected = computed(() => {
    const id = this.selectedId();
    return id === null ? null : (this.contactService.getContactById(id) ?? null);
  });

  protected selectContact(id: number): void {
    this.selectedId.set(id);
    this.mode.set('view');
  }

  protected startAdd(): void {
    this.mode.set('add');
  }

  protected add(data: ContactData): void {
    const contact = this.contactService.addContact(data);
    this.selectContact(contact.id);
  }

  protected update(data: ContactData): void {
    const id = this.selectedId();
    if (id !== null) this.contactService.updateContact(id, data);
    this.mode.set('view');
  }

  protected remove(id: number): void {
    if (!confirm('Видалити контакт?')) return;
    this.contactService.deleteContact(id);
    this.selectedId.set(null);
  }
}
