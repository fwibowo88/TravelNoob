import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place;
  constructor(
    private actRoute:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService) { }

  ngOnInit() {
    //Always Update Data Cause -> Subscribe Method
    this.actRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeID'))
      {
        this.navCtrl.navigateBack('places/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeID'))
    });
  }

}
