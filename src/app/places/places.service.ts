import { Injectable } from '@angular/core';
import { Place } from './place.model';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places : Place[] = [
    new Place(
      'pl01',
      'Shang-Ri La Hotel Surabaya',
      'Best Hotel In Surabaya.',
      'https://q-cf.bstatic.com/images/hotel/max1024x768/190/190617708.jpg',
      149.5,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
    new Place(
      'pl02',
      'Hotel 88 Budget',
      'Best Budget Hotel In Surabaya.',
      'https://q-cf.bstatic.com/images/hotel/max1024x768/846/84627017.jpg',
      25,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
    new Place(
      'pl03',
      'Whiz Prime Hotel Arjuna',
      'Best Business Hotel in Downtown Surabaya',
      'https://r-cf.bstatic.com/images/hotel/max1024x768/642/64263030.jpg',
      70.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
  ];

  get places(){
    return [...this._places];
  }

  constructor() { }

  getPlace(id:string)
  {
    return {...this._places.find(p => p.id === id)};
  }
}
