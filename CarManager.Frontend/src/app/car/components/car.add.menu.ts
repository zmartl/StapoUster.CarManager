import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'car-add-menu',
    templateUrl: '../templates/car.add.menu.html'
})
export class CarAddMenu {
    @Input() isValid: boolean;
    @Output() saveClicked = new EventEmitter();

    constructor(private location: Location) { }

    public save(): void {
        this.saveClicked.emit();
    }

    public back(): void {
        this.location.back();
    }
}