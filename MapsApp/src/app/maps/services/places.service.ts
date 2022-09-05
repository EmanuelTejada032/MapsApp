import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?: [number, number] 
  
  get isUseLocationReady():boolean {
    return !!this.useLocation;
  }

  constructor() { 
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
          console.log("Location couldnt be found");
          reject();
        }
      )
    })
  }
}
