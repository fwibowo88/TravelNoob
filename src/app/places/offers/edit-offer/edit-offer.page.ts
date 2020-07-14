import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

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
      
      this.form = new FormGroup({
        title: new FormControl(this.place.title,{
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.place.description,{
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
      });
    });
  }

  onUpdateOffer(){
    if(!this.form.valid)
    {
      return;
    }
    console.log(this.form);
  }
}
