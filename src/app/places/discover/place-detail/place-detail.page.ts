import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

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
    private placeService:PlacesService) { }

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
    this.navCtrl.navigateBack('places/discover')
  }

}
