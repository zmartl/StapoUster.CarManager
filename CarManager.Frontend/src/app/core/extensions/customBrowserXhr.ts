import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
/* Start on every HTML connection the loading bar on the top */
export class CustomBrowserXhr extends BrowserXhr {
    constructor(private slimLoadingBarService: SlimLoadingBarService) {
        super();
    }

    build(): any {
        let xhr = super.build();
        xhr.onloadstart = (event) => {
            this.slimLoadingBarService.start();
        };
        xhr.onloadend = (event) => {
            this.slimLoadingBarService.complete();
        };
        return <any>(xhr);
    }
}