import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[validateNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: NumberValidator, multi: true }
    ]
})
export class NumberValidator implements Validator {
    validate(num: FormControl) {

        console.log( 'validate' );

        let isValid = num.value > 0;

        // if valid return null => no error
        if (isValid) return null;

        // if invalid return a validation error
        // in view, check the number.errors property
        return {
            validateNumber: {
                valid: false
            }
        };
    }
}
