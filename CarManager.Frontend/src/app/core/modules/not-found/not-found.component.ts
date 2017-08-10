import { Component } from '@angular/core';

@Component({
    templateUrl: './404.html',
    styles: [' #inner { display: table; margin: 0 auto;}']
})
export class NotFoundComponent {
    goBack() {
        window.history.back();
    }
}