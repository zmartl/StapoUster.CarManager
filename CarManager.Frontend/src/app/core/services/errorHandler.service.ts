import { Injectable } from "@angular/core";

import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerModel, ErrorMode } from "../models/errorHandler.model";
import { CommonService } from "./common.service";

@Injectable()
export class ErrorHandlerService {
    constructor(private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService){}

    public handleError(error: any): Promise<any> {
        let errorMessage: string = "";
        let body = null;
        
        if (error._body !== "") {
            body = JSON.parse( error._body );
        }

        if ((!error || !body) && !error.status) errorMessage += "Keine Kommunikation mit dem Server" + "\r\n";

        if (body && body.exceptionMessage) errorMessage += body.exceptionMessage;

        //Check if a conflict
        if (error.status === 409) {
            const headerErrorMessage = error.headers.get("X-ErrorMessage");
            if (headerErrorMessage !== null || headerErrorMessage !== undefined || headerErrorMessage !== "") {
                return Promise.reject(new ErrorHandlerModel(headerErrorMessage, ErrorMode.Warning));
            } 
        }

        return Promise.reject(new ErrorHandlerModel(errorMessage) );
    }

    public showError(error: ErrorHandlerModel): void {
        if (error.errorMode === ErrorMode.Error) {
            this.translate.get(['error']).subscribe((res: string) => {
                this.toastr.error(error.errorMessage, res["error"], this.commonService.getErrorToastrConfig());
            });
        } else {
            this.translate.get(['warning']).subscribe((res: string) => {
                this.toastr.warning(error.errorMessage, res["warning"]);
            });
        }
    }
}