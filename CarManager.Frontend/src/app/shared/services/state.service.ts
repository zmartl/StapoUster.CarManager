import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../../core/services/errorHandler.service";
import { CommonService } from "../../core/services/common.service";

import { StateModel } from "../models/state.model";

@Injectable()
export class StateService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/states';

    constructor(private http: Http, private errorHandlerService: ErrorHandlerService, private commonService: CommonService) { }

    public getStates(): Promise<Response> {
        return this.http.get(this.url)
            .toPromise()
            .then((response: Response) => response)
            .catch(this.errorHandlerService.handleError);
    }

    public get(id: number): Observable<StateModel> {
        return this.http.get(`${this.url}/${id}`)
            .map((response: Response) => response.json() as StateModel)
            .catch(this.errorHandlerService.handleError);
    }

    public add(state: StateModel): Observable<StateModel> {
        return this.http.post(this.url, JSON.stringify(state), { headers: this.commonService.getHeader() })
            .map((response: Response) => response.json().data)
            .catch(this.errorHandlerService.handleError);
    }

    public update(state: StateModel): Observable<StateModel> {
        return this.http.put(this.url, JSON.stringify(state), { headers: this.commonService.getHeader() })
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    public delete(itemId: number): Observable<any> {
        return this.http.delete(`${this.url}/${itemId}`)
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    public toggleActive(positionDefinitionId: number): Observable<any> {
        return this.http.get(`${this.url}/toggleDelete/${positionDefinitionId}`)
            .map((response: Response) => response.json())
            .catch(this.errorHandlerService.handleError);
    }

    private getParams(stateSearchModel: StateModel = null): URLSearchParams {
        let params = new URLSearchParams();

        if (!this.commonService.isNullOrUndefined(stateSearchModel.id)) {
            params.set('id', stateSearchModel.id.toString());
        }
        return params;
    }
}