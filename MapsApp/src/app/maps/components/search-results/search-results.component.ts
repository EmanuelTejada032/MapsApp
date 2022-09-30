import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  selectedId: string = '0';

  get placesLoading(): boolean{return this.placesServices.placesLoading};
  get places(): Feature[]{return this.placesServices.places};

  constructor(private placesServices: PlacesService
              , private mapService: MapService) { }

  ngOnInit(): void {
  }


  flyTo(place: Feature){
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat])
  }

}
