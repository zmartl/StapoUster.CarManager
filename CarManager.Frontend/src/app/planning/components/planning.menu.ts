﻿import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'planning-menu',
    templateUrl: '../templates/planning.menu.html'
})
export class PlanningMenu {
    constructor(private translate: TranslateService) { }
}