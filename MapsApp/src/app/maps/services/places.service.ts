import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?: [number, number] 

  placesLoading: boolean = false;
  places: Feature[] = [];

  
  
  get isUseLocationReady():boolean {
    return !!this.useLocation;
  }

  constructor(private placesCustomHttpApi: PlacesApiClient) { 
    this.getUseLocation();
  }

  public async getUseLocation(): Promise<[number, number]>{
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) =>{
          this.useLocation = [coords.longitude, coords.latitude]; 
          resolve(this.useLocation);
        },
        (err) => {
          console.log(err);
          console.log('Location couldnt be found');
          reject();
        }
      )
    })
  }

  public getPlacesByQuery(query: string = ''){
    this.placesLoading = true;
    if(!this.useLocation) throw Error('Location could\'t be found');

    return this.placesCustomHttpApi.get<PlacesResponse>(`/${query}.json`,{ 
      params: {
        proximity: this.useLocation.join(',')
      }
    })
    .subscribe( resp => {
      this.placesLoading = false;
      this.places = resp.features;
      console.log(this.places);
    })
  }
}
