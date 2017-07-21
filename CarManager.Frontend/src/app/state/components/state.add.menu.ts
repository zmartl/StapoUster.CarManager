import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'item-definition-add-menu',
    templateUrl: '../templates/item.add.menu.html'
})
export class ItemAddMenu {
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