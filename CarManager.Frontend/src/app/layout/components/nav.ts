import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router'

@Component({
    selector: 'site-navigation',
    templateUrl: '../templates/nav.html'
})
export class Navigation {
    activeAppMenu: boolean;

    ngOnInit() {
        this.activeAppMenu = true;
    }
}