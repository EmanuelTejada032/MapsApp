import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

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

  constructor(private http: HttpClient) { 
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
    return this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=do&limit=10&proximity=-69.93190757074991%2C18.465133862176017&types=place%2Caddress%2Cneighborhood&language=es&access_token=pk.eyJ1IjoiaGVybWFuZGFkMDMyIiwiYSI6ImNreGhpMmcydDBhdmcycHF3MHJ0MnJtZHAifQ.dxim_rQxF48qe2pYPVovyA`)
    .subscribe( resp => {
      this.placesLoading = false;
      this.places = resp.features;
      console.log(this.places);
    })
  }
}
