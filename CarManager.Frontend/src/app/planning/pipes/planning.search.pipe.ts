import { Pipe } from "@angular/core";

import {PlanningModel} from "../../shared/models/planning.model";

@Pipe({
    name: "itemSearch"
})

export class PlanningSearchPipe
{
    transform(value: PlanningModel[], searchTerm: string) {
        if (searchTerm === '') {
            return value;
        }

        searchTerm = searchTerm.toLowerCase();

        return value.filter(item =>
            item.id.toString().indexOf(searchTerm) !== -1 ||
            item.car.name.toString().indexOf(searchTerm) !== -1
        );
    }
}