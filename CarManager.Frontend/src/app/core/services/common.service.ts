import { Injectable } from '@angular/core';
import { URLSearchParams, Headers } from '@angular/http';

import { ToastrConfig } from 'ngx-toastr';

import { SearchModel } from "../../shared/models/search.model";

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

    getSearchParams(searchModel: SearchModel): URLSearchParams {
        let params = new URLSearchParams();

        if (this.isNullOrUndefined(searchModel)) {
            return params;
        }

        if (!this.isNullOrUndefined(searchModel.start)) {
            params.set('start', searchModel.start.toString());
        }
        if (!this.isNullOrUndefined(searchModel.pageSize)) {
            params.set('pageSize', searchModel.pageSize.toString());
        }
        if (!this.isNullUndefinedOrEmpty(searchModel.searchTerm)) {
            params.set('searchTerm', searchModel.searchTerm);
        } 
        if (!this.isNullOrUndefined(searchModel.withDeleted)) {
            params.set('withDeleted', searchModel.withDeleted.toString());
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