import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Map, Popup, Marker} from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild("mapDiv") mapDivElement?: ElementRef

  constructor(private placesService: PlacesService) { }
  ngAfterViewInit(): void {
    if(!this.placesService.useLocation) throw new Error('Method not implemented.');
    const map = new Map({
      container: this.mapDivElement?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 18, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
    });
    const popup = new Popup({ closeOnClick: false })
      .setLngLat(this.placesService.useLocation)
      .setHTML('<h1>My Job</h1>')
      .addTo(map);

    const marker = new Marker({draggable: true})
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map)
  }
 

}
