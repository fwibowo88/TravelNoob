import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSub: Subscription;
  
  constructor(private placesService: PlacesService,private router:Router) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places=>{
      this.offers = places;
    });
  }

  onEdit(offerID:String,slidingItem:IonItemSliding)
  {
    slidingItem.close();
    this.router.navigate(['/','places','offers','edit-offer',offerID]);
  }
  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
