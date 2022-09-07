import { Component } from '@angular/core';

@Component({
  selector: 'app-my-location-btn',
  templateUrl: './my-location-btn.component.html',
  styleUrls: ['./my-location-btn.component.css']
})
export class MyLocationBtnComponent {

  constructor() { }

  ngOnInit(): void {
  }

  goToMyLocation(){
      // set map to my location
      console.log("Going to my location");
  }

}
