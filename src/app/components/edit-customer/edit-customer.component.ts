import { Component, OnInit } from '@angular/core';
import { Customer }  from  '../../models/customer';
import { CustomersService } from '../../services/customers.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})

export class EditCustomerComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  id: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  }

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private FlashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() 
  {
    document.title='COMPANY CRM | Edit Customer Form ';
    this.headerTitle = 'Edit Customer Form';
    this.headerIcon = 'fas fa-pen';
    this.id = this.route.snapshot.params['id'];
    this.customersService.getCustomer(this.id).subscribe( customer => this.customer = customer);
  }

  onSubmit({value, valid }: { value: Customer, valid: boolean }){
    if ( valid ){
      this.FlashMessagesService.show('Customer saved', {
        cssClass: 'fixed-bottom m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      })
      value.id=this.id;
      this.customersService.updateCustomer(value);
      this.router.navigate(['/customers']);
    }
  }
}
