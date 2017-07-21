/*  Example use:
 *      <search-box (update)="searchValue = $event" [searchForTranslation]="'user'"></search-box>
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'search-box',
    templateUrl: './search.box.component.html'
})
export class SearchBox {
    @Input() searchForTranslation : string = '';
    @Output() update = new EventEmitter();
    searchText: string = '';

    ngOnInit() {
        this.update.emit('');
    }

    search() {
        this.update.emit(this.searchText);
    }

    onChange(value) {
        this.update.emit(value);
    }
}