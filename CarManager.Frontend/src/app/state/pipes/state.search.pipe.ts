import { Pipe } from "@angular/core";

import {ItemModel} from "../../shared/models/item.model";

@Pipe({
    name: "itemSearch"
})

export class EmailrecipientSearchPipe
{
    transform(value: ItemModel[], searchTerm: string) {
        if (searchTerm === '') {
            return value;
        }

        searchTerm = searchTerm.toLowerCase();

        return value.filter(item =>
            item.itemDefinitionId.toString().indexOf(searchTerm) !== -1 ||
            item.name.toString().indexOf(searchTerm) !== -1
        );
    }
}