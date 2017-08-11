import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'planning-edit-menu',
    templateUrl: '../templates/planning.edit.menu.html'
})
export class PlanningEditMenu {
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