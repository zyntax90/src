import { Component } from '@angular/core';
import { FileService } from '../pages/common/services';
@Component({
  selector: 'page-location'
})
export class LocationManager {
 
    private static instance: LocationManager = new LocationManager();
    private locations: Array<Location> = FileService.loadLocations();
        
    constructor() {
        if (LocationManager.instance) {
            throw new Error("Singeleton Exception");
        }
        
        LocationManager.instance = this;
    }

    public static getInstace(): LocationManager {
        return LocationManager.instance;
    }

    public addLocation(location):void {
        this.locations.push(location);
    }

    public getLocations(): Array<Location> {
        return this.locations;
    }

    public getRandomLocation(): Location {
        var arrayIndex = Math.floor(Math.random() * this.locations.length);
        return this.locations[arrayIndex];
    }

    public getPointsApart(locationFrom, locationGoal): number {
        var xDiff = Math.abs(locationGoal.xPosition - locationFrom.xPosition);
        var yDiff = Math.abs(locationGoal.yPosition - locationFrom.yPosition);
        var result = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)); 
        
        return result;
    }

}
