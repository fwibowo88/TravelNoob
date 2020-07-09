import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  private place:Place;
  
  constructor(
    // private router:Router, 
    private navCtrl:NavController,
    private actRoute:ActivatedRoute,
    private placeService:PlacesService,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeID'))
      {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeID'));
    });
  }

  onBookPlace()
  {
    // this.router.navigateByUrl('places/discover');
    // this.navCtrl.navigateBack('places/discover');

    // this.modalCtrl.create({
    //   component: CreateBookingComponent, 
    //   componentProps: {selectedHotel:this.place},
    //   // id : 'bookModal'
    // })
    // .then(modalEl => {
    //   modalEl.present();
    //   modalEl.onDidDismiss();
    // })
    // .then(resultData => {
    //   console.log(resultData);
    // });


    this.modalCtrl
    .create({
      component: CreateBookingComponent,
      componentProps: { selectedHotel: this.place }
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

}
