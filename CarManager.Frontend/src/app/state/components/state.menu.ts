import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'item-definition-menu',
    templateUrl: '../templates/item.menu.html'
})
export class ItemMenu {
    constructor(private translate: TranslateService) { }
}