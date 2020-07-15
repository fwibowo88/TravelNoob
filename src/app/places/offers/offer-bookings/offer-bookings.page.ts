import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;

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
      this.placeSub = this.placesService.getPlace(paramMap.get('placeID')).subscribe(place=>{
        this.place = place;
      })
    });
  }

  ngOnDestroy(){
    if(this.placeSub)
    {
      this.placeSub.unsubscribe();
    }
  }

}
