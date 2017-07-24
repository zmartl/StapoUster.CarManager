import { Pipe } from "@angular/core";

import {StateModel} from "../../shared/models/state.model";

@Pipe({
    name: "itemSearch"
})

export class StateSearchPipe
{
    transform(value: StateModel[], searchTerm: string) {
        if (searchTerm === '') {
            return value;
        }

        searchTerm = searchTerm.toLowerCase();

        return value.filter(item =>
            item.id.toString().indexOf(searchTerm) !== -1 ||
            item.name.toString().indexOf(searchTerm) !== -1
        );
    }
}