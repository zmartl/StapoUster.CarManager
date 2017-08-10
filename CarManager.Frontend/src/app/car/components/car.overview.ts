import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { CarService } from "../../shared/services/car.service";
import {CarModel} from "../../shared/models/car.model";

@Component( {
    selector: "car-overview",
    styleUrls: ['../templates/car.overview.scss'],
    templateUrl: "../templates/car.overview.html"
} )
export class CarOverview implements OnInit {
    cars: CarModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private carService: CarService) {}

    ngOnInit(): void {             
        EmitterService.get("CarSearchChanged").emit();        
    }

    private changeCarSearch() {        
        EmitterService.get( "CarSearchChanged" ).emit();
    }
}