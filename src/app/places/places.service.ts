import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Place } from './place.model';


@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  // private _places : Place[] = [
  //   new Place(
  //     'pl01',
  //     'Shang-Ri La Hotel Surabaya',
  //     'Best Hotel In Surabaya.',
  //     'https://q-cf.bstatic.com/images/hotel/max1024x768/190/190617708.jpg',
  //     149.5,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'usr1'
  //   ),
  //   new Place(
  //     'pl02',
  //     'Hotel 88 Budget',
  //     'Best Budget Hotel In Surabaya.',
  //     'https://q-cf.bstatic.com/images/hotel/max1024x768/846/84627017.jpg',
  //     25,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'usr2'
  //   ),
  //   new Place(
  //     'pl03',
  //     'Whiz Prime Hotel Arjuna',
  //     'Best Business Hotel in Downtown Surabaya',
  //     'https://r-cf.bstatic.com/images/hotel/max1024x768/642/64263030.jpg',
  //     70.99,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'usr3'
  //   ),
  // ];

  private _places = new BehaviorSubject<Place[]>(
    [
      new Place(
        'pl01',
        'Shang-Ri La Hotel Surabaya',
        'Best Hotel In Surabaya.',
        'https://q-cf.bstatic.com/images/hotel/max1024x768/190/190617708.jpg',
        149.5,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'usr1'
      ),
      new Place(
        'pl02',
        'Hotel 88 Budget',
        'Best Budget Hotel In Surabaya.',
        'https://q-cf.bstatic.com/images/hotel/max1024x768/846/84627017.jpg',
        25,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'usr2'
      ),
      new Place(
        'pl03',
        'Whiz Prime Hotel Arjuna',
        'Best Business Hotel in Downtown Surabaya',
        'https://r-cf.bstatic.com/images/hotel/max1024x768/642/64263030.jpg',
        70.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'usr3'
      ),
    ]
  );

  get places(){
    // return [...this._places];
    return this._places.asObservable();
  }

  constructor(
    private authService: AuthService) { }

  getPlace(id:string)
  {
    return this.places.pipe(
      take(1),
      map(places=>{
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title:string, description:string,  price:number, dateFrom:Date, dateTo:Date)
  {
    const newPlace = new Place(
        Math.random().toString(), 
        title, 
        description,'https://r-cf.bstatic.com/images/hotel/max1024x768/642/64263030.jpg',
        price, 
        dateFrom, 
        dateTo,
        this.authService.userID
      );

      // this._places.push(newPlace);
      this.places.pipe(take(1)).subscribe(places => {
        this._places.next(places.concat(newPlace));
      });

  }
}
