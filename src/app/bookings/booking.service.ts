import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings: Booking[] = [
    {
      id: 'booking01',
      placeId:'pl01',
      placeTitle: 'Shang-Ri La Hotel Surabaya',
      guestNumber : 2,
      userID: 'user1'
    }
  ];
  

  get bookings()
  {
    return [...this._bookings];
  }

  constructor() { 
  }
}
