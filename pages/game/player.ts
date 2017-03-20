import { Component } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'page-player'
})
export class Player {
    public location: Location;
    public isConfirmed : boolean;

  constructor() {
      this.location = new Location();
      this.isConfirmed = false;
    }

 
}
