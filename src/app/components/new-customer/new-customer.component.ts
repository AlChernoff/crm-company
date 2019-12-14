import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomersService } from './../../services/customers.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  headerTitle:string;
  headerIcon:string;
  address: string = '';
  notes: string = '';

  constructor(
    private customerService: CustomersService,
    private router: Router,
    private FlashMessagesService : FlashMessagesService
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Add Customer Form';
    this.headerTitle = 'Add Customer Form';
    this.headerIcon = 'fas fa-plus-circle';
  }

  onSubmit({value, valid }: { value: Customer, valid: boolean }){
    if ( valid ){
      this.FlashMessagesService.show('Customer saved', {
        cssClass: 'fixed-bottom m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      })
      this.customerService.addCustomer(value);
      this.router.navigate(['/customers']);
    }
  }
}
