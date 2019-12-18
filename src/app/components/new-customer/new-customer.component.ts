/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  address: string = '';
  notes: string = '';

  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private cs: CustomersService,
    private router: Router,
    private fms: FlashMessagesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    document.title = 'COMPANY CRM | Add Customer Form';
    this.headerTitle = 'Add Customer Form';
    this.headerIcon = 'fas fa-plus-circle';

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

      this.fms.show('Customer saved', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center', timeout: 3000
      });
      this.cs.addCustomer(value);
      this.router.navigate(['/customers']);

    }

  }

}
