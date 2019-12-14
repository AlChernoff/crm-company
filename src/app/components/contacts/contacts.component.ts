import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Array<Contact>;
  contactsCache: Array<Contact>;
  contactsLength: number;
  searchText: string;
  headerIcon: string;
  headerTitle: string;

  constructor(
    private contactService: ContactsService
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Contacts';

    this.contactService.getContacts().subscribe((contacts: Array<Contact>)=>{
      this.contactsCache =this.contacts = _.sortBy(contacts, ['name']);
      this.contactsLength = this.contacts.length;
    });

    this.headerTitle = "Contacts";
    this.headerIcon = "fas fa-envelope"
  }

  onKeyupSearch(){
    const searchText = this.searchText.toLowerCase().trim();
    if(searchText.length > 0){
      this.contacts = this.contactsCache.filter((contact) =>_.includes(contact.name.toLowerCase(), searchText));
    } else{
        this.contacts = this.contactsCache;
    }
  };

}
