import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedHotel:Place;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null,'cancel');
  }

  onBookHotel(){
    this.modalCtrl.dismiss(
      { message: 'Booked Hotel'},
      'confirm'
      );
  }
}
