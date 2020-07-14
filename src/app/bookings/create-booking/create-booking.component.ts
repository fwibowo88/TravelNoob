import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedHotel:Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('fData', { static: true }) form: NgForm;

  startDate: string;
  endDate: string;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedHotel.availableFrom);
    const availableTo = new Date(this.selectedHotel.availableTo);

    if(this.selectedMode === 'random')
    {
      this.startDate = new Date(
        availableFrom.getTime() + 
          Math.random() * 
            (availableTo.getTime() - 
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
        ).toISOString();

      // this.endDate = new Date(this.startDate).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
            6 * 24 * 60 * 60 * 1000 - 
            new Date(this.startDate).getTime())
        ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null,'cancel');
  }

  onBookHotel(){
    if(!this.form.valid || !this.datesValid)
    {
      return;
    }

    this.modalCtrl.dismiss({ bookingData: {
      fName: this.form.value['firstName'],
      lname: this.form.value['lastName'],
      guestNumber: this.form.value['guestNumber'],
      startDate: this.form.value['date-From'],
      endDate: this.form.value['date-To']
    }},'confirm' );
  }

  datesValid(){

    const startDate = new Date(this.form.value['date-From']);
    const endDate = new Date(this.form.value['date-To']);

    return endDate > startDate;
  }
}
