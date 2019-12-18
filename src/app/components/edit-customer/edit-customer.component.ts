/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomersService } from '../../services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

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
    email: '',
    phone: '',
    address: '',
    notes: ''
  };

  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private cs: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private fms: FlashMessagesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Edit Customer Form';
    this.headerTitle = 'Edit Customer Form';
    this.headerIcon = 'fas fa-pen';
    this.id = this.route.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {

    if (valid) {

      value.id = this.id;
      this.cs.updateCustomer(value);
      this.fms.show('Customer updates saved', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center', timeout: 3000
      });
      this.router.navigate(['/customers']);
    }

  }

}
