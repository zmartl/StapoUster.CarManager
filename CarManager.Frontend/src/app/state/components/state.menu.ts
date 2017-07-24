import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'state-menu',
    templateUrl: '../templates/state.menu.html'
})
export class StateMenu {
    constructor(private translate: TranslateService) { }
}