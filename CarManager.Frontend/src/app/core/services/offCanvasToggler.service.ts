import { Injectable } from '@angular/core';

@Injectable()
export class OffCanvasTogglerService {

    public static isMenuOpen : boolean = false;

    static toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}