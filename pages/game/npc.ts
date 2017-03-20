import { Component } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'page-npc'
})
export class Npc {
  public location : Location;

  constructor() {
      this.location = new Location();
  }
  
  public setLocation(location): void {
      this.location = location;
  }

 
}
