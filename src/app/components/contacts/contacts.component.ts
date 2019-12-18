import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Array<Contact>;
  contactsOrigin: Array<Contact>;
  contactsLength: number = 0;
  searchNameText: string;
  headerTitle: string;
  headerIcon: string;

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {

    document.title = 'COMPANY CRM | Contacts';
    this.contactsService.getContacts().subscribe((contacts: Array<Contact>) => {
      this.contactsOrigin = this.contacts = _.sortBy(contacts, ['name']);
      this.contactsLength = this.contacts.length;
    });

    this.searchNameText = '';
    this.headerTitle = 'Contacts';
    this.headerIcon = 'fas fa-envelope';

  }

  onSearchName() {
    let searchNameText = this.searchNameText.toLowerCase();
    if (searchNameText.length > 0) {
      this.contacts = this.contactsOrigin.filter(contact => _.includes(contact.name.toLowerCase(), searchNameText));
    } else {
      this.contacts = this.contactsOrigin;
    }

  }

}
