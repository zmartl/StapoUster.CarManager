import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'car-menu',
    templateUrl: '../templates/car.menu.html'
})
export class CarMenu {
    constructor(private translate: TranslateService) { }
}