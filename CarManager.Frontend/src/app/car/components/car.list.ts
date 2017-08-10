import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Response } from '@angular/http';

import { EmitterService } from "../../core/services/emitter.service";
import { CommonService } from "../../core/services/common.service";

import { CarService } from '../../shared/services/car.service';

@Component({
    selector: 'car-list',
    templateUrl: '../templates/car.list.html'
})

export class CarList implements OnInit, OnDestroy{
    @Output() totalCount = new EventEmitter();
    public cars: any[] = [];
    private changeSubsrciption: any = null;

    constructor(private carService: CarService, private commonService: CommonService) { }

    ngOnInit(): void {        
        this.getItems();
        this.changeSubsrciption = EmitterService.get("CarSearchChanged").subscribe(() => this.getItems());        
    }

    ngOnDestroy(): void {
        this.changeSubsrciption.unsubscribe();
    }

    private getItems(): void {
        this.carService
            .getCars()
            .then((res) => {                
                this.cars = res.json();                
                this.totalCount.emit(res.headers.get('X-TotalCount'));                
            });        
    }
}