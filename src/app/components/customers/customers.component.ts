import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  customers: Customer[];
  customersOrigin: Customer[];
  firstName: string;
  lastName: string;
  phone: string;

  constructor(
    private cs: CustomersService,
    private FlashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Customers';
    this.headerTitle = 'Customers';
    this.headerIcon = 'fas fa-user';
    this.cs.getCustomers().subscribe(customers => this.customersOrigin = this.customers = customers);
  }

  showOnHover(event) {
    event.target.children[0].children[0].style.cssText = 'visibility:visible !important';
  }

  hideOnLeave(event) {
    event.target.children[0].children[0].style.cssText = 'visibility:hidden !important';
  }

  onDeleteCustomer(customerId, event) {
    event.preventDefault();
    if (confirm('Are you sure?')) {
      this.FlashMessagesService.show('Customer deleted', {
        cssClass: 'fixed-bottom m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      });
      this.cs.deleteCustomer(customerId);
    }
  }

  onSearch(field) {
    let searchField = this[field].toLowerCase();
    if (searchField.length > 0) {
      this.customers = this.customersOrigin.filter(data => _.includes(data[field].toLowerCase(), searchField));
    } else {
      this.customers = this.customersOrigin;
    }

  }


}
