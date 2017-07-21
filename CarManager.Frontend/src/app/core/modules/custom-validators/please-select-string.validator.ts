import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

// Validate '-- Bitte auswählen --' selectedbox on pos 0

@Directive({
    selector: '[validateString]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PleaseSelectStringValidator, multi: true }
    ]
})

export class PleaseSelectStringValidator implements Validator {
    validate(field: FormControl) {

        let isValid = field.value !== 0; // pos 0

        // if valid return null => no error
        if (isValid) return null;

        // if invalid return a validation error
        // in view, check the number.errors property
        return {
            selectedString: false
        };
    }
}
