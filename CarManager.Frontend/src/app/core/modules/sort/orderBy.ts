/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : 'title'"
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'orderBy',
    pure: false
})
export class OrderBy implements PipeTransform {

    private orderByComparator(a: any, b: any): number {
        
        if (a === null || typeof a === "undefined") { a = 0; }
        if (b === null || typeof b === "undefined") { b = 0; }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            a = this.prepareString(a);
            b = this.prepareString(b);
            if (a < b) return -1;
            if (a > b) return 1;
        } else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    private prepareString(value) {
        let type = typeof value;

        if (type !== "string") {
            value = value.toString();
        }

        value = value.toLowerCase();
        value = value.replace(/ä/g, 'ae');
        value = value.replace(/ö/g, 'oe');
        value = value.replace(/ü/g, 'ue');
        value = value.replace(/ß/g, 'ss');
        return value;
    }

    transform(input: any, config = '+'): any {
        if (!Array.isArray(input)) return input;

        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            var propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) === '-';

            //Basic array
            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc ? input.sort() : input.sort().reverse();
            } else {
                var property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return input.sort((a: any, b: any) => (
                    !desc
                        ? this.orderByComparator(a[property], b[property])
                        : -this.orderByComparator(a[property], b[property])));
            }
        } else {
            //Loop over property of the array in order and sort
            return input.sort((a: any, b: any) => {
                for (let i: number = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) === '-';
                    var property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];
                    
                    var comparison = !desc
                        ? this.orderByComparator(a[property], b[property])
                        : -this.orderByComparator(a[property], b[property]);
                    
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}