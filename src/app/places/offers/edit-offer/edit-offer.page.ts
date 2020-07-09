import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place:Place;

  constructor(
    private actRoute:ActivatedRoute,
    private navCtrl:NavController,
    private placeService:PlacesService) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeID'))
      {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeID'));
    });
  }
}
