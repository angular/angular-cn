import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import { delay }      from 'rxjs/operator/delay';

export class Contact {
  constructor(public id: number, public name: string) { }
}

const CONTACTS: Contact[] = [
  new Contact(21, 'Yasha'),
  new Contact(22, 'Iulia'),
  new Contact(23, 'Karina')
];

const FETCH_LATENCY = 500;

/** Simulate a data service that retrieves contacts from a server */
@Injectable()
export class ContactService implements OnDestroy {

  constructor() { console.log('ContactService instance created.'); }
  ngOnDestroy() { console.log('ContactService instance destroyed.'); }

  getContacts(): Observable<Contact[]>  {
    return delay.call(of(CONTACTS), FETCH_LATENCY);
  }

  getContact(id: number | string): Observable<Contact> {
    const contact$ = of(CONTACTS.find(contact => contact.id === +id));
    return delay.call(contact$, FETCH_LATENCY);
  }
}


