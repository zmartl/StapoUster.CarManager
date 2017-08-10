import { Pipe } from "@angular/core";

import {CarModel} from "../../shared/models/car.model";

@Pipe({
    name: "carSearch"
})

export class CarSearchPipe
{
    transform(value: CarModel[], searchTerm: string) {
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