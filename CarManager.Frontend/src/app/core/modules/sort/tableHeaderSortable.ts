/*  Example use:
 *      <th sort [by]="'propertyName'" [activeSort]="bindingToActiveSort" (change)="onSortChange($event)">Sorting Header</th>
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[sort]',
    templateUrl: './tableHeaderSortable.html'
})

export class TableHeaderSortable {
    @Input() by: string;
    @Input() activeSort: string;
    @Output() change = new EventEmitter();
    
    private asc: boolean = true;

    public onClick(): void {
        if (this.activeSort == null || this.activeSort == undefined) {
            return;
        }

        if (this.activeSort === this.by) {
            this.asc = !this.asc;
        } else {
            this.asc = true;
        }
        this.change.emit({ by: this.by, asc: this.asc });
    }
}