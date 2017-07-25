import { Component, Input } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { OffCanvasTogglerService } from "./services/offCanvasToggler.service";

@Component({
    selector: 'app',
    templateUrl: '../layout/templates/app.html'
})
export class AppComponent {
    public offCanvasToggler : any;

    constructor(
        private translate: TranslateService,
        private slimLoadingBarService: SlimLoadingBarService) {

        this.offCanvasToggler = OffCanvasTogglerService;

        translate.addLangs(["en", "de"]);
        translate.setDefaultLang('de');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    }
}