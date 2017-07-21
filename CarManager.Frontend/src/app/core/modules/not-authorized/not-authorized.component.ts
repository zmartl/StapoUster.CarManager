import { Component } from '@angular/core';

@Component({
    templateUrl: './401.html'
})
export class NotAuthorizedComponent {
    goBack() {
        window.history.back();
    }
}