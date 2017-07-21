import {Pipe} from "@angular/core";

@Pipe({
    name: "search"
})
export class SearchPipe {
    transform(value, searchTerm) {
        if (searchTerm === '') {
            return value;
        }
        return value.filter(item => item.title.indexOf(searchTerm) !== -1);
    }
}