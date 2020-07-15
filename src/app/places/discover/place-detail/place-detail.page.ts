import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy {
  private place:Place;
  private placeSub: Subscription;

  constructor(
    // private router:Router, 
    private navCtrl:NavController,
    private actRoute:ActivatedRoute,
    private placeService:PlacesService,
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeID'))
      {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      this.placeSub = this.placeService.getPlace(paramMap.get('placeID')).subscribe(place =>
      {
        this.place = place;
      });
    });
  }

  onBookPlace()
  {

    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons :[
        {
          text: 'Select Date',
          handler: ()=> {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: ()=> {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
    
  }

  openBookingModal(mode:'select' | 'random')
  {
    console.log(mode);
    this.modalCtrl
    .create({
      component: CreateBookingComponent,
      componentProps: { selectedHotel: this.place, selectedMode: mode }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('BOOKED!');
      }
    });
  }

  ngOnDestroy()
  {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
