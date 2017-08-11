import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'statistic-menu',
    templateUrl: '../templates/statistic.menu.html'
})
export class StatisticMenu {
    constructor(private translate: TranslateService) { }
}