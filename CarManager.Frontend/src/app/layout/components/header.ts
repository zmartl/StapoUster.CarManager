import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { TranslateService } from 'ng2-translate';
import { AccountService } from "../../shared/services/account.service";
import { ErrorHandlerService } from "../../core/services/errorHandler.service";

@Component({
    selector: 'header',
    templateUrl: '../templates/header.html'
})
export class Header implements OnInit {
    currentUser : any;

    constructor(
        private accountService: AccountService,
        private translate: TranslateService,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.myUser();
    }

    private myUser() {
        this.accountService
            .getMyUser()
            .then(response => this.currentUser = response)
            .catch(this.errorHandlerService.handleError);
    }
}