import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../../core/services/errorHandler.service";
import { CommonService } from "../../core/services/common.service";

import { StatisticModel } from "../models/statistic.model";

@Injectable()
export class StatisticService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/statistics';

    constructor(private http: Http, private errorHandlerService: ErrorHandlerService, private commonService: CommonService) { }

    public getStatistics(): Promise<Response> {
        return this.http.get(this.url)
            .toPromise()
            .then((response: Response) => response)
            .catch(this.errorHandlerService.handleError);
    }

    public get(id: number): Observable<StatisticModel> {
        return this.http.get(`${this.url}/${id}`)
            .map((response: Response) => response.json() as StatisticModel)
            .catch(this.errorHandlerService.handleError);
    }

    public add(statistic: StatisticModel): Observable<StatisticModel> {
        return this.http.post(this.url, JSON.stringify(statistic), { headers: this.commonService.getHeader() })
            .map((response: Response) => response.json().data)
            .catch(this.errorHandlerService.handleError);
    }

    public update(statistic: StatisticModel): Observable<StatisticModel> {
        return this.http.put(this.url, JSON.stringify(statistic), { headers: this.commonService.getHeader() })
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    public delete(itemId: number): Observable<any> {
        return this.http.delete(`${this.url}/${itemId}`)
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    private getParams(statisticSearchModel: StatisticModel = null): URLSearchParams {
        let params = new URLSearchParams();

        if (!this.commonService.isNullOrUndefined(statisticSearchModel.id)) {
            params.set('id', statisticSearchModel.id.toString());
        }
        return params;
    }
}