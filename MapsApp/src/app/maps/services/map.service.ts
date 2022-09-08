import { Injectable } from '@angular/core';
import { Map, LngLatLike } from 'mapbox-gl';
import { ignoreElements } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  get isMapReady(): boolean{
      return !!this.map;
  } 

  setMap(map:Map){
    this.map = map;
  }

  flyTo(coords: LngLatLike ){
    if(!this.isMapReady) throw Error('Map is not initialized yet');
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }


}
