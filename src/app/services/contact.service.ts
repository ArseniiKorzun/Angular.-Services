import { Injectable, signal } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

export type ContactData = Omit<Contact, 'id'>;

@Injectable({ providedIn: 'root' })
export class ContactService {
  private nextId = 4;
  private readonly contacts = signal<Contact[]>([
    { id: 1, name: 'Іван Петренко', phone: '+380501234567', email: 'ivan@example.com', address: 'Київ, вул. Хрещатик, 1', note: 'Колега' },
    { id: 2, name: 'Олена Коваль', phone: '+380671112233', email: 'olena@example.com', address: 'Львів, пл. Ринок, 5', note: 'Подруга' },
    { id: 3, name: 'Андрій Шевченко', phone: '+380931234000', email: 'andrii@example.com', address: 'Одеса, вул. Дерибасівська, 10', note: '' }
  ]);

  getContacts() {
    return this.contacts.asReadonly();
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts().find(c => c.id === id);
  }

  searchContacts(query: string): Contact[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.contacts();
    return this.contacts().filter(c =>
      [c.name, c.phone, c.email, c.address].some(field => field.toLowerCase().includes(q))
    );
  }

  addContact(data: ContactData): Contact {
    const contact: Contact = { ...data, id: this.nextId++ };
    this.contacts.update(list => [...list, contact]);
    return contact;
  }

  updateContact(id: number, data: ContactData): void {
    this.contacts.update(list => list.map(c => (c.id === id ? { ...data, id } : c)));
  }

  deleteContact(id: number): void {
    this.contacts.update(list => list.filter(c => c.id !== id));
  }
}
