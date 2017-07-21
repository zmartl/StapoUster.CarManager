import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

// Validate unsigned numbers, bigger then 0

@Directive({
    selector: '[validatePositiveNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PositiveNumberValidator, multi: true }
    ]
})
export class PositiveNumberValidator implements Validator {
    validate(num: FormControl)
    {
        let isValid = num.value > 0;

        // if valid return null => no error
        if (isValid) return null;

        // if invalid return a validation error
        // in view, check the number.errors property
        return {
            positiveNumber: false
        };
    }
}
