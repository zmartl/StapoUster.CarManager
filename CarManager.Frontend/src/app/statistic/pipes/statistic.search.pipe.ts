import { Pipe } from "@angular/core";

import {StatisticModel} from "../../shared/models/statistic.model";

@Pipe({
    name: "itemSearch"
})

export class StatisticSearchPipe
{
    transform(value: StatisticModel[], searchTerm: string) {
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