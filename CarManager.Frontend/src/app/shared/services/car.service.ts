import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../../core/services/errorHandler.service";
import { CommonService } from "../../core/services/common.service";

import { CarModel } from "../models/car.model";

@Injectable()
export class CarService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/cars';

    constructor(private http: Http, private errorHandlerService: ErrorHandlerService, private commonService: CommonService) { }

    public getCars(): Promise<Response> {
        return this.http.get(this.url)
            .toPromise()
            .then((response: Response) => response)
            .catch(this.errorHandlerService.handleError);
    }

    public get(id: number): Observable<CarModel> {
        return this.http.get(`${this.url}/${id}`)
            .map((response: Response) => response.json() as CarModel)
            .catch(this.errorHandlerService.handleError);
    }

    public add(car: CarModel): Observable<CarModel> {
        return this.http.post(this.url, JSON.stringify(car), { headers: this.commonService.getHeader() })
            .map((response: Response) => response.json().data)
            .catch(this.errorHandlerService.handleError);
    }

    public update(car: CarModel): Observable<CarModel> {
        return this.http.put(this.url, JSON.stringify(car), { headers: this.commonService.getHeader() })
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    public delete(itemId: number): Observable<any> {
        return this.http.delete(`${this.url}/${itemId}`)
            .map(() => null)
            .catch(this.errorHandlerService.handleError);
    }

    private getParams(carSearchModel: CarModel = null): URLSearchParams {
        let params = new URLSearchParams();

        if (!this.commonService.isNullOrUndefined(carSearchModel.id)) {
            params.set('id', carSearchModel.id.toString());
        }
        return params;
    }
}