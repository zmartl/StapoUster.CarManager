import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

// Validate '-- @ and .ch, .com, ... --' input field

@Directive({
    selector: '[validateEmailAddress]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailAddressValidator, multi: true }
    ]
})

export class EmailAddressValidator implements Validator {
    validate(field: FormControl) {
        
        let isValid = field.value !== null && (field.value.includes("@") && (field.value.includes(".ch") || field.value.includes(".com")));

        // if valid return null => no error
        if (isValid) return null;

        // if invalid return a validation error
        // in view, check the emailAddressString.errors property
        return {
            emailAddressString: false
        };
    }
}