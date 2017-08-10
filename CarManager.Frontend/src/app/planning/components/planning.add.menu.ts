import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'planning-add-menu',
    templateUrl: '../templates/planning.add.menu.html'
})
export class PlanningAddMenu {
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