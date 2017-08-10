import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../../core/services/errorHandler.service";
import { CommonService } from "../../core/services/common.service";

import { PlanningModel } from "../models/planning.model";

@Injectable()
export class PlanningService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/plannings';

    constructor(private http: Http, private errorHandlerService: ErrorHandlerService, private commonService: CommonService) { }

    public getPlannings(): Promise<Response> {
        return this.http.get(this.url)
            .toPromise()
            .then((response: Response) => response)
            .catch(this.errorHandlerService.handleError);
    }

    public get(id: number): Observable<PlanningModel> {
        return this.http.get(`${this.url}/${id}`)
            .map((response: Response) => response.json() as PlanningModel)
            .catch(this.errorHandlerService.handleError);
    }

    public add(planning: PlanningModel): Observable<PlanningModel> {
        return this.http.post(this.url, JSON.stringify(planning), { headers: this.commonService.getHeader() })
            .map((response: Response) => response.json().data)
            .catch(this.errorHandlerService.handleError);
    }

    public update(planning: PlanningModel): Observable<PlanningModel> {
        return this.http.put(this.url, JSON.stringify(planning), { headers: this.commonService.getHeader() })
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    public delete(itemId: number): Observable<any> {
        return this.http.delete(`${this.url}/${itemId}`)
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    private getParams(planningSearchModel: PlanningModel = null): URLSearchParams {
        let params = new URLSearchParams();

        if (!this.commonService.isNullOrUndefined(planningSearchModel.id)) {
            params.set('id', planningSearchModel.id.toString());
        }
        return params;
    }
}