import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-my-location-btn',
  templateUrl: './my-location-btn.component.html',
  styleUrls: ['./my-location-btn.component.css']
})
export class MyLocationBtnComponent {

  constructor(private placesService: PlacesService, private mapService: MapService) { }

  ngOnInit(): void {
  }

  goToMyLocation(){
    if(!this.placesService.isUseLocationReady) throw Error("There is no user location");
    if(!this.mapService.isMapReady) throw Error("There is not available map");
    this.mapService.flyTo(this.placesService.useLocation!);
  }

}
