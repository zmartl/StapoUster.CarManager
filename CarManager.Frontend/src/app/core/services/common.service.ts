import { Injectable } from '@angular/core';
import { URLSearchParams, Headers } from '@angular/http';

import { ToastrConfig } from 'ngx-toastr';

@Injectable()
export class CommonService {
    getHeader(): Headers {
      return new Headers( { 'Content-Type': 'application/json' } );
    }

    getErrorToastrConfig(): ToastrConfig {
        let toastrOptions: ToastrConfig = {
            maxOpened: 5,
            positionClass: 'toast-bottom-right',
            closeButton: true,
            enableHtml: true,
            timeOut: 0,
            extendedTimeOut: 3000
        };
        return toastrOptions;
    }

    getSearchParams(searchTerm: string): URLSearchParams {
        let params = new URLSearchParams();

        if (!this.isNullUndefinedOrEmpty(searchTerm)) {
            params.set('searchTerm', searchTerm);
        } 

        return params;
    }

    isNullOrUndefined(param: any): boolean {
        return param === null || param === undefined;
    }

    isNullUndefinedOrEmpty(param: string): boolean {
        return this.isNullOrUndefined( param ) || param === "";
    }
}