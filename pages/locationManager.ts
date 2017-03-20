import { Component } from '@angular/core';
import { FileService } from '../pages/common/services';
@Component({
  selector: 'page-location'
})
export class LocationManager {
 
    private static instance: LocationManager = new LocationManager();
    private locations: Array<Location> = FileService.loadLocations();

    private xOfOneKm = 19.84;
    private yOfOneKm = 19.40;

    constructor() {
        if (LocationManager.instance) {
            throw new Error("Singeleton Exception");
        }

        if (this.locations == null)
            this.locations = new Array<Location>();
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
        var xKm = xDiff / this.xOfOneKm;
        var yKm = yDiff / this.yOfOneKm;

        return Math.sqrt(Math.pow(xKm, 2) + Math.pow(yKm, 2)); 
    }

    public setPoint(location,newX,newY): void {
        location.xPosition = newX;
        location.yPosition = newY;
        location.index = newX + newY;
    }
}
