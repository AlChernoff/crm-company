import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomersService } from '../../services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

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
  };

  constructor(
    private cs: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Customer Details';
    this.headerTitle = 'Customer Details';
    this.headerIcon = 'fas fa-user';
    this.id = this.route.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

}
