import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { TranslateService } from 'ng2-translate';
import { ErrorHandlerService } from "../../core/services/errorHandler.service";

@Component({
    selector: 'site-navigation',
    templateUrl: '../templates/nav.html'
})
export class Navigation {
    activeAppMenu: boolean;

    constructor(
        private translate: TranslateService,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
    ) { }

    ngOnInit() {
        this.activeAppMenu = true;
    }
}