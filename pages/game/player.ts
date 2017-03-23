import { Component } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'page-player'
})
export class Player {
    public location: Location;
    public isConfirmed: boolean;
    public name: string;

  constructor(name) {
      this.location = new Location();
      this.isConfirmed = false;
      this.name = name;
  }

 
}
